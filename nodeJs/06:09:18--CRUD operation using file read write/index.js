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



app.get('/api/courses', (req, res) => {
    try {
        // Is it a directory?
        if (fs.existsSync('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json')) {
            console.log("file is exist");
            res.send(data);
        } else {
            console.log("file not exist");
        }
    } catch (e) {
        console.log("some other error");
    }


});

// app.get('/api/courses/:id', (req,res) => {
//  //to search the id inbuilt function find 
//     const course = data.courses.find(c => c.id == parseInt(req.params.id));

//     //if the resourse not found send msg
//     if(!course) res.status(404).send('course not found')
//     //if course found return it to client
//     res.send(course);
// })

app.post('/api/courses', (req, res) => {
    console.log("calling post")

    //validation for post data if validations are manualy..........
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('name is required min 3 characters');
        return;
    }

    // assignig id and name of course
    var course = {
        id: req.body.id,
        name: req.body.name
    };
    data.courses.push(course);
    console.log(course);




    try {
        // Is it a directory?
        if (fs.existsSync('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/CRUD/courses.json')) {
            console.log("file is exist");
            fs.writeFile('courses.json', JSON.stringify(data), function(err) {
                if (err) throw err;
                console.log(course);
            });
        } else {
            console.log("file not exist");
            fs.writeFile('courses.json', JSON.stringify(data), function(err) {
                console.log('sdfgdsf')
                console.log("file is created");
                console.log(err);
                if (err) throw err;
                console.log(course);
            });
        }
    } catch (e) {
        console.log("some other error");
    }
});


app.listen(3004, () => console.log('Listening on port 3002'));