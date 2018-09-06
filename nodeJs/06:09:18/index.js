const joi = require('joi');
const express = require('express');
var fs = require('fs');
const app = express();


const data = require('./courses')

//adding a middleware to use json object
app.use(express.json());


// var courses = [
//     { id: 1, name: 'Node'},
//     { id: 2, name: 'Express'},
//     { id: 3, name: 'Mongo'}
// ]

app.get('/',(req,res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req,res) => {
    res.send(data);
});

app.get('/api/courses/:id', (req,res) => {

    //to search the id inbuilt function find 
    const course = data.courses.find(c => c.id == parseInt(req.params.id));
    
    //if the resourse not found send msg
    if(!course) res.status(404).send('course not found')
    //if course found return it to client
    res.send(course);
})

app.post('/api/courses', (req,res) => {
    console.log("calling post")
    

    //validation for post data if validations are manualy..........
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('name is required min 3 characters');
        return;
    }


    //assignig id and name of course
    var course = {
        id: req.body.id,
        name: req.body.name
    };    
    data.courses.push(course);
    console.log(course);

    fs.writeFile('courses.json',JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log(course);
      });

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look if course is exist or not
    //If not exist give status as 404
    console.log("put request");
    const courseId = data.courses.find(c => c.id === parseInt(req.params.id));
    //console.log(courseId);
    if(!courseId) {
        res.status(404).send('course not found');
        return;
    }
    course={
        id:courseId.id,
        name:req.body.name
    }
     fs.writeFile('courses.json',JSON.stringify(course), function (err) {
        if (err) throw err;
        console.log(course.name);
      });
   // now update the course
   
    //send it
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    //look if the course is exist or not
    const course = data.courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('course not found');
        return;
    }
    //to delete the object
    const index = data.courses.indexOf(course);
    data.courses.splice(index,1);


    fs.writeFile('courses.json',JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log(course.name);
      });
    
    res.send(course);
});

app.listen(3002,() => console.log('Listening on port 3002'));