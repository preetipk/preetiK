var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');
//app.use(express.methodOverride());

mongoose.connect("mongodb://localhost/employee"); // database
var Schema = new mongoose.Schema({ //created schema
    name: String,
    email: String,
    id: Number
});

var persons = mongoose.model("persons", Schema);

app.get('/users', function(req, res, next) {
    async.series([
        function(callback) {
            callback(null, persons);
        }
    ], function(error, data) {
        persons.find({}, function(error, comments) {
            console.log(comments);
            res.send(comments);
        });
    })
});

app.post('/users', function(req, res, next) {
    var id = req.body.id;
    var isIdExist = false;
    var newPerson = {
        id: id,
        name: req.body.name,
        email: req.body.email
    }
    console.log(newPerson);

    //var dbId = ;
    console.log("id from database=" + dbId)

    async.series([
        function(callback) {
            persons.forEach(function(obj) {
                if (obj.id === id) {
                    isIdExist = true;
                }
            });
            if (isIdExist === true) {
                callback('Person is already added');
            } else {
                callback();
            }
        },
        function(callback) {
            persons.push(newPerson);
            callback(null, persons)
        }

    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
});
app.listen(3017, () => console.log('Listening on port 3017'));