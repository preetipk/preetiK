const joi = require('joi');
const express = require('express');
const app = express();
var fs = require('fs');

var data = require('./courses')

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
    //if course found return it to clint
    res.send(course);
})

app.post('/api/courses', (req,res) => {
    //to show structure of object create a schema
    const schema = {
        name:joi.string().min(3).required()
    };

    //validation using joi package
    const result = joi.validate(req.body,schema);
    //console.log(result);

    if(!result.error){
            res.status(400).send(result.error);
            return;
        }

    //validation for post data if validations are manualy..........
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('name is required min 3 characters');
    //     return;
    // }


    //assignig id and name of course
    var course = {
        id: req.body.id,
        name: req.body.name
    };
    data.courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look if course is exist or not
    //If not exist give status as 404
    console.log("put request");
    const course = data.courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('course not found');
        return;
    }
    
    //now update the course
    course.name = req.body.name;
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

    res.send(course);
});

app.listen(3001,() => console.log('Listening on port 3001'));