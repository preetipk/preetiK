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
            callback(null);
        }
    ], function(error, data) {
        persons.find({}, function(error, comments) {
            console.log(comments);
            res.send(comments);
        });
    })
});

app.get('/users/:id', function(req, res, next) {
    console.log("calling get by id");

    var id = parseInt(req.params.id);
    console.log("id is=" + id);

    var isIdExist = true;

    async.series([
        function(callback) {
            persons.find({ "id": id }, function(err, data) {
                if (data.length) {
                    isIdExist === true;
                    console.log("abc" + isIdExist);
                }
                if (isIdExist === false) {
                    callback("id not found...cant update data");
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            persons.find({ "id": id }, function(err, data) {
                callback(null, data);
            })
        }
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
    email = req.body.id;
    isIdExist = true;
    let person = new persons();
    person.id = req.body.id;
    person.name = req.body.name;
    person.email = req.body.email;

    async.series([
        function(callback) {
            persons.find({ "email": email }, function(err, data) {
                if (data.length) {
                    isIdExist === true;
                }
                if (isIdExist === false) {
                    callback("id not found...cant update data");
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
                    persons.find({}, function(err, person) {
                        console.log(person);
                        callback(null, "data inserted successfully");
                    })
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
            persons.find({ "email": "email" }, function(err, data) {
                console.log("email is=" + email);
                if (data.length) {
                    isIdExist === true;
                    console.log("flag =" + isIdExist);
                }
                if (isIdExist === false) {
                    callback("id not found...cant update data");
                } else {
                    callback();
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
                    persons.find({}, function(err, person) {
                        console.log(person);
                        callback(null, "data with " + email + " updated successfully");
                    })
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
    id = req.params.id;
    isIdExist = true;

    async.series([
        function(callback) {
            persons.find({ "id": id }, function(err, data) {
                if (data.length) {
                    isIdExist === true;
                }
                if (isIdExist === false) {
                    callback("id not found...cant update data");
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            persons.remove({ "id": id }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    persons.find({}, function(err, person) {
                        console.log(person);
                        callback(null, person);
                    })
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