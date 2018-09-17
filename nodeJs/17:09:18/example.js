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

app.get('/users/:id?', function(req, res, next) {
    console.log("calling get method by id");
    var reqparam = parseInt(req.params.id);
    var reqquery = req.params.email;
    var flag = true;

    var result = persons.find({}, function(err, data) {
        console.log("calling find method");
        if (err) {
            next(err);
        } else {

            console.log("mongodb data" + JSON.stringify(data));
            // res.json("mongodb data"+data);
        }
    })

    console.log("mongodb json data" + result);


    const person = result.find(c => c.id == parseInt(req.params.id));

    console.log("find data" + JSON.stringify(person));

    async.series([
        function(callback) {

            if (person) {
                isIdExist === true;
            }
            if (isIdExist === false) {
                callback("id not found...cant update data");
            } else {
                callback();
            }

        },
        function(callback) {
            callback(null, persons);
        }
    ], function(error, Data) {
        if (error) {
            res.send(error);
        } else {
            res.send(Data);
        }
    })
});

app.get('/users/:email?', function(req, res, next) {
    console.log("calling get method by email");
    var reqparam = parseInt(req.params.email);
    var reqquery = req.params.email;
    var flag = true;

    var result = persons.find({}, function(err, data) {
        console.log("calling find method");
        if (err) {
            next(err);
        } else {

            console.log("mongodb data" + JSON.stringify(data));
            // res.json("mongodb data"+data);
        }
    })

    console.log("mongodb json data" + result);


    const person = result.find(c => c.email == parseInt(req.params.email));

    console.log("find data" + JSON.stringify(person));

    async.series([
        function(callback) {

            if (person) {
                isIdExist === true;
            }
            if (isIdExist === false) {
                callback("id not found...cant update data");
            } else {
                callback();
            }

        },
        function(callback) {
            callback(null, persons);
        }
    ], function(error, Data) {
        if (error) {
            res.send(error);
        } else {
            res.send(Data);
        }
    })
});


app.post('/users', function(req, res) {
    id = req.body.id;
    isIdExist = true;
    let person = new persons();
    let person = {};
    person.id = req.body.id;
    person.name = req.body.name;
    person.email = req.body.email;

    var result = persons.find({}, function(err, data) {
        console.log("calling find method");
        if (err) {
            next(err);
        } else {

            console.log("mongodb data" + JSON.stringify(data));
            // res.json("mongodb data"+data);
        }
    })

    const person = result.find(c => c.email == parseInt(req.params.email));

    console.log("find data" + JSON.stringify(person));


    async.series([
        function(callback) {

            if (person) {
                isIdExist === true;
            }
            if (isIdExist === false) {
                callback("id not found...cant update data");
            } else {
                callback();
            }

        },
        function(callback) {
            person.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    persons.find({}, function(err, person) {
                        console.log(person);
                        callback(null, person);
                    })
                }
            })
        }
    ])
})

app.put('/users/:id', function(req, res) {
    console.log("calling put method");
    id = req.params.id;
    isIdExist = true;
    let person = {};
    person.id = id;
    person.name = req.body.name;
    person.email = req.body.email;
    console.log("person=" + JSON.stringify(person));

    var result = persons.find({}, function(err, data) {
        console.log("calling find method");
        if (err) {
            next(err);
        } else {

            console.log("mongodb data" + JSON.stringify(data));
            // res.json("mongodb data"+data);
        }
    })

    const person = result.find(c => c.email == parseInt(req.params.email));

    console.log("find data" + JSON.stringify(person));



    async.series([
        function(callback) {


            if (person) {
                isIdExist === true;
                console.log("flag =" + flag);
            }
            if (isIdExist === false) {
                callback("id not found...cant update data");
            } else {
                callback();
            }

        },
        function(callback) {
            persons.updateMany({ "id": id }, person, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    persons.find({}, function(err, person) {
                        console.log(person);
                        callback(null, person)
                    })
                }
            })
        }
    ])
})

app.delete('/users/:id', function(req, res) {
    console.log("calling put method");
    id = req.params.id;
    isIdExist = true;

    var result = persons.find({}, function(err, data) {
        console.log("calling find method");
        if (err) {
            next(err);
        } else {

            console.log("mongodb data" + JSON.stringify(data));
            // res.json("mongodb data"+data);
        }
    })

    const person = result.find(c => c.email == parseInt(req.params.email));

    console.log("find data" + JSON.stringify(person));



    async.series([
        function(callback) {

            if (person) {
                isIdExist === true;
            }
            if (isIdExist === false) {
                callback("id not found...cant update data");
            } else {
                callback();
            }

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
    ])
})
app.listen(3020, () => console.log('Listening on port 3020'));