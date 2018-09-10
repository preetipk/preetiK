const joi = require('joi');
const express = require('express');
querystring = require('querystring'); 
var fs = require('fs');
async = require("async");
const app = express();
app.use(express.json());


app.get('/users', async function (req, res) {
   //console.log("in get function");
    try {
        
           if (fs.existsSync('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/10:09:18/users.json')) {
                console.log("file is exist");
                   fs.readFile('./users.json', function(err, data) {
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
            
   
})

app.post('/users', async (req,res) => {
    console.log("calling post")
    
     var data = fs.readFileSync('users.json');
    var user = JSON.parse(data);
    console.log("users are"+JSON.stringify(user));

    
    try {
        // Is it a directory?
        if (fs.existsSync('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json')) {
            console.log("file is exist");

            const users = user.users.find(c => c.id === parseInt(req.body.id));
            console.log(users);
            console.log("course id="+users.id);
           
            if(users) {
                res.send('user is already exist');
                return;
            }else{
                    fs.writeFile('users.json',JSON.stringify(users), function (err) {
                    if (err) throw err;
                    console.log(user);
                });
            }

                
        }else{
            console.log("file not exist");
            fs.writeFile('users.json',JSON.stringify(user), function (err) {
                console.log("file is created");
                console.log(err);
                if (err) throw err;
                console.log(user);
          });
        }
    }
    catch (e) {
       console.log("some other error");
    }
res.send(user);
});

app.put('/users/:id', function(req, res)  {
    let id = req.params.id;
    // console.log("id="+id);
      fs.exists('users.json', function(exists) {
          if(exists) {
          console.log('File exists....');
            fs.readFile("/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json", function (err, data) {
            data = JSON.parse( data );
            console.log("data is"+JSON.stringify())
            const user = data.users.find(c => c.id === parseInt(req.params.id));
           
            if(!user) {
                res.status(404).send('user not found');
                return;
            }
            
            
            user.id = req.body.id;
            user.name = req.body.name;
            user.name = req.body.name;

            res.send(data);
            var json = JSON.stringify(data); 
            fs.writeFile('users.json', json); 
            res.end( JSON.stringify(data));
          });
          } else {
           
            console.log('File not found');
            res.send("File not found" );
          }
        });
      
    
        });
app.listen(3053,() => console.log('Listening on port 3053'));


