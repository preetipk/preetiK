const joi = require('joi');
const express = require('express');
//querystring = require('querystring'); 
var fs = require('fs');
const app = express();
var data1 = require('./courses');


//const data = require('./courses')

//adding a middleware to use json object
app.use(express.json());

app.get("/api/courses/:id",function(req,res){
    var id = req.query.id;
    console.log("query string id="+id)
    console.log(JSON.stringify(req.query));
    res.send('id',{id:req.query});
});

// app.get('api/courses/name', function(req, res) {
//     console.log("req.query.name");  
//     res.send(data.getCourses(req.query.name)); 
    
//   });

app.get('/api/courses', (req,res) => {
    try {
        
        if (fs.existsSync('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json')) {
            console.log("file is exist");
           fs.readFile('./courses.json', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
              });
            
        }else{
            console.log("file not exist");
        }
    }
    catch (e) {
       console.log("some other error");
    }
    
    
});

app.get('/api/courses/:id', (req,res) => {
 //to search the id inbuilt function find 
    
    const course = data1.courses.find(c => c.id == parseInt(req.query.id));
    
    //if the resourse not found send msg
    if(!course) res.status(404).send('course not found')
    //if course found return it to client
    res.send(course);
})

app.post('/api/courses', (req,res) => {
    console.log("calling post")
    
    //validation for post data if validations are manualy..........
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('name is required min 3 characters');
    //     return;
    // }

    var data = fs.readFileSync('courses.json');
    var course = JSON.parse(data);
    console.log(course);

    try {
        // Is it a directory?
        if (fs.existsSync('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json')) {
            console.log("file is exist");
                fs.writeFile('courses.json',JSON.stringify(course), function (err) {
                if (err) throw err;
                console.log(course);
          });
        }else{
            console.log("file not exist");
            fs.writeFile('courses.json',JSON.stringify(course), function (err) {
                console.log("file is created");
                console.log(err);
                if (err) throw err;
                console.log(course);
          });
        }
    }
    catch (e) {
       console.log("some other error");
    }
//res.send(course);
});

app.put('api/courses/:id', function(req, res)  {
    let id = req.params.id;
     console.log("id="+id);
      fs.exists('courses.json', function(exists) {
          if(exists) {
          console.log('File exists....');
            fs.readFile("/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json", function (err, data) {
            data = JSON.parse( data );
            const user = data.courses.find(c => c.id === parseInt(req.query.id));
           
            if(!course) {
                res.status(404).send('course not found');
                return;
            }
            
            
            course.id = req.body.id;
            course.name = req.body.name;

            res.send(data);
            var json = JSON.stringify(data); 
            fs.writeFile('courses.json', json); 
            res.end( JSON.stringify(data));
          });
          } else {
           
            console.log('File not found');
            res.send("File not found" );
          }
        });
      
    
        });

        app.delete('api/courses/:id', function (req, res)  {
            fs.exists('courses.json', function(exists) {
            if(exists) {
                console.log('File exists....');
                let id = req.params.id;
           
                fs.readFile("/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json", function (err, data) {
                 
                 data = JSON.parse( data );
                 const course = data.courses.find(c => c.id === parseInt(req.params.id));
                if(!course) {
                res.status(404).send('course not found');
                return;
            }
                  //to delete
                const index = data.courses.indexOf(user);
                  data.courses.splice(index,1);
              //res.send("data deleted");
              res.send(data);
              var json = JSON.stringify(data); 
              fs.writeFile('courses.json', json); 
              res.end( JSON.stringify(data));
                });  
                } else {
                  res.send("File not found" );
                }
              });
            
            
          
          });





app.listen(3010,() => console.log('Listening on port 3009'));









