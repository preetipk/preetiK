var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/employee"); // database
var Schema = new mongoose.Schema({ //created schema
    name: String,
    email: String,
    id: Number
});

var persons = mongoose.model("persons", Schema);

app.get('/users', function(req, res, next) {
    persons.find({}, function(error, comments) {
        console.log(comments);
        res.send(comments);
    });
});

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
    email = req.body.email;
    let person = new persons();
    person.id = req.body.id;
    person.name = req.body.name;
    person.email = email;

    async.series([
        function(callback) {
            persons.find({ "email": email }, function(err, data) {
                if (err) {
                    console.log(err);

                } else if (data.length) {
                    callback("email already exist");
                } else {
                    callback();
                }
            })


        },
        function(callback) {
            person.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(person);
                    callback(null, "data inserted successfully");

                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.put('/users/:email', function(req, res) {
    console.log("calling put method");
    email = req.params.email;
    isIdExist = true;
    let person = {};
    person.id = req.body.id;
    person.name = req.body.name;
    person.email = email;
    console.log("person=" + JSON.stringify(person));

    async.series([
        function(callback) {
            persons.find({ "email": email }, function(err, data) {
                if (err) {
                    console.log(err);
                } else if (data.length) {
                    callback();
                } else {
                    callback("email not exist");
                }
            })


        },
        function(callback) {
            persons.updateMany({ "email": email }, person, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(person);
                    callback(null, "data with " + email + " updated successfully");
                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.delete('/users/:id', function(req, res) {
    console.log("calling delete method");
    id = parseInt(req.params.id);
    isIdExist = true;

    async.series([
        function(callback) {
            persons.find({ "id": id }, function(err, data) {
                if (err) {
                    console.log(err);
                } else if (data.length) {
                    callback();
                } else {
                    callback("id not exist");
                }
            })


        },
        function(callback) {
            persons.remove({ "id": id }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "data deleted successfully");
                }

            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})
app.listen(3018, () => console.log('Listening on port 3018'));