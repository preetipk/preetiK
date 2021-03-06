var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const persons = require('./schema');
const ids = require('./mainSchema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })


app.get('/users', function(req, res) {
    persons.find({}, function(error, comments) {
        console.log(comments);
        res.send(comments);
    });
});

app.get('/users/:email', function(req, res) {
    console.log("calling get by id");

    var email = req.params.email;
    console.log("email is=" + email);


    async.series([
        function(callback) {
            persons.find({ "email": email }, function(err, data) {
                console.log("data is=" + data);
                if (err) {
                    console.log(err);

                } else if (data.length > 0) {
                    persons.find({ "email": email }, function(err, data) {
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


app.get('/ids/:id', function(req, res) {
    console.log("calling get by id");

    var id = req.params.id;
    console.log("id is=" + id);


    async.series([
        function(callback) {
            ids.find({ "id": id }, function(err, data) {
                console.log("data is=" + data);
                if (err) {
                    console.log(err);

                } else if (data.length > 0) {
                    ids.find({ "id": id }, function(err, data) {
                        console.log("final data=" + data);
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
            console.log("data=" + JSON.stringify(Data));
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
                console.log("data=" + JSON.stringify(data));
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
            person.save(function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(data);
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

app.post('/ids', function(req, res) {
    id = req.body.id;
    let qId = new ids();
    qId.id = id


    async.series([
        function(callback) {
            ids.find({ "id": id }, function(err, data) {
                //console.log("data=" + JSON.stringify(data));
                if (err) {
                    console.log(err);

                } else if (data.length) {
                    callback("id already exist");
                } else {
                    callback();
                }
            })


        },
        function(callback) {
            qId.save(function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(data);
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
app.listen(3020, () => console.log('Listening on port 3020'));