var express = require('express');
var async = require('async');
const persons = require('./mainSchema');
const users = require('./schema');
var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/employee');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })


app.get('/users/:id', function(req, res) {
    console.log("calling get by id");

    var id = parseInt(req.params.id);
    console.log("id is=" + id);


    async.series([
        function(callback) {
            persons.find({ "id": id }, function(err, data) {
                if (err) {
                    console.log(err);

                } else if (data.length) {
                    persons.find({ "id": id }, function(err, data) {
                        callback(null, data);
                    })
                } else {
                    callback("data not found");
                }
            })
        },

    ], function(error, Data) {
        if (error) {
            res.send(error);
        } else {
            console.log("data=" + Data);
            res.send(Data);
        }
    })
});


app.post('/users', function(req, res) {
    console.log("calling post");
    let id = parseInt(req.body.id);
    console.log("id=" + id);
    //let email = req.query.email;
    //flag = false;

    let user = new users();
    user.id = id;
    let person = new persons();
    person.name = req.body.name;
    person.email = req.body.email
    async.series([
            function(callback) {

                persons.find({ "id": id }, function(err, data) {
                    if (err) {
                        console.log("error=" + err);

                    } else if (data.length) {
                        callback("data already exist");
                    } else {
                        console.log("data=" + data);
                        person.id = data._id;
                        callback();
                    }
                })
            },

            function(callback) {
                users.save(function(err) {
                    if (err) {
                        console.log(err);

                    } else {
                        callback("Data is successfully stored");
                    }
                })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })

})
app.listen(3052, () => console.log('Listening on port 3052'));