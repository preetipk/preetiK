// var express = require('express');
// var app = express();
// app.use(express.json());
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// var async = require('async');
// var mongoose = require('mongoose');
// //app.use(express.methodOverride());

// mongoose.connect("mongodb://localhost/employee"); // database
// var Schema = new mongoose.Schema({ //created schema
//     name: String,
//     email: String,
//     id: Number
// });

// var persons = mongoose.model("persons", Schema);

// app.get('/users', function(req, res, next) {
//     async.series([
//         function(callback) {
//             callback(null);
//         }
//     ], function(error, data) {
//         persons.find({}, function(error, comments) {
//             console.log(comments);
//             res.send(comments);
//         });
//     })
// });

// // app.get('/users/:id?', function(req, res, next) {
// //     console.log("calling get method by id");
// //     var query_id = parseInt(req.params.id);
// //     var query_email = req.params.email;
// //     var flag = true;



// //     var result = persons.find({}, { "_id": 0, "id": 1 }, function(err, data) {
// //         console.log("calling find method");
// //         if (err) {
// //             next(err);
// //         } else {
// //             console.log("mongodb data" + JSON.stringify(data));
// //             // res.json("mongodb data"+data);
// //         }
// //     })

// //     async.series([
// //         function(callback) {

// //             if (result.id === query_id) {
// //                 flag === true;
// //             }
// //             if (flag === false) {
// //                 callback("id not found...cant show data");
// //             } else {
// //                 callback();
// //             }

// //         },
// //         function(callback) {
// //             persons.find({ "id": query_id }, function(err, data) {
// //                 callback(null, data);
// //             })
// //         }
// //     ], function(error, Data) {
// //         if (error) {
// //             res.send(error);
// //         } else {
// //             res.send(Data);
// //         }
// //     })
// // });

// app.get('/users/:email?', function(req, res, next) {
//     console.log("calling get method by email");
//     //var query_id = parseInt(req.params.email);
//     var query_email = req.params.email;
//     var flag = true;

//     var result = persons.find({}, { "_id": 0, "email": 1 }, function(err, data) {
//         console.log("calling find method");
//         if (err) {
//             next(err);
//         } else {
//             console.log("mongodb data" + JSON.stringify(data));
//             // res.json("mongodb data"+data);
//         }
//     })

//     //console.log("mongodb json data" + result);

//     async.series([
//         function(callback) {
//             console.log("in callback");

//             if (result.email === query_email) {
//                 flag === true;
//                 console.log("flag is" + flag);
//             }
//             if (flag === false) {
//                 callback("email not found...cant show data");
//             } else {
//                 callback();
//             }

//         },
//         function(callback) {
//             persons.find({ "email": "query_email" }, function(err, data) {
//                 callback(null, data);
//             })
//         }
//     ], function(error, Data) {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(Data);
//         }
//     })
// });


// app.post('/users', function(req, res) {
//     id = parseInt(req.body.id);
//     flag = true;
//     let person = new persons();
//     person.id = req.body.id;
//     person.name = req.body.name;
//     person.email = req.body.email;

//     var result = persons.find({}, { "_id": 0, "id": 1 }, function(err, data) {
//         console.log("calling find method");
//         if (err) {
//             next(err);
//         } else {
//             console.log("mongodb data" + JSON.stringify(data));
//             // res.json("mongodb data"+data);
//         }
//     })



//     async.series([
//         function(callback) {

//             if (result.id === id) {
//                 flag === true;
//                 console.log("flag is" + flag);
//             }
//             if (flag === true) {
//                 callback("id is already exist");
//             } else {
//                 callback();
//             }

//         },
//         function(callback) {
//             person.save(function(err) {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 } else {
//                     persons.find({}, function(err, person) {
//                         console.log(person);
//                         callback(null, person);
//                     })
//                 }
//             })
//         }
//     ])
// })

// app.put('/users/:id', function(req, res) {
//     console.log("calling put method");
//     id = parseInt(req.params.id);
//     flag = true;
//     let person = new persons();
//     person.id = id;
//     person.name = req.body.name;
//     person.email = req.body.email;
//     console.log("person=" + JSON.stringify(person));

//     var result = persons.find({}, { "_id": 0, "id": 1 }, function(err, data) {
//         console.log("calling find method");
//         if (err) {
//             next(err);
//         } else {
//             console.log("mongodb data" + JSON.stringify(data));
//             // res.json("mongodb data"+data);
//         }
//     })
//     async.series([
//         function(callback) {

//             if (result.id === id) {
//                 flag === true;
//                 console.log("flag is" + flag);
//             }
//             if (flag === false) {
//                 callback("id is not exist");
//             } else {
//                 callback();
//             }


//         },
//         function(callback) {
//             persons.updateMany({ "id": id }, person, function(err) {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 } else {
//                     persons.find({}, function(err, person) {
//                         console.log(person);
//                         callback(null, person)
//                     })
//                 }
//             })
//         }
//     ])
// })

// app.delete('/users/:id', function(req, res) {
//     console.log("calling put method");
//     id = parseInt(req.params.id);
//     flag = true;


//     var result = persons.find({}, { "_id": 0, "id": 1 }, function(err, data) {
//         console.log("calling find method");
//         if (err) {
//             next(err);
//         } else {
//             console.log("mongodb data" + JSON.stringify(data));
//             // res.json("mongodb data"+data);
//         }
//     })
//     async.series([
//         function(callback) {

//             if (result.id === id) {
//                 flag === true;
//                 console.log("flag is" + flag);
//             }
//             if (flag === false) {
//                 callback("id is not exist");
//             } else {
//                 callback();
//             }

//         },
//         function(callback) {
//             persons.remove({ "id": id }, function(err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     persons.find({}, function(err, person) {
//                         console.log(person);
//                         callback(null, person);
//                     })
//                 }

//             })
//         }
//     ])
// })
// app.listen(3020, () => console.log('Listening on port 3020'));


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
    persons.find({}, function(error, comments) {
        console.log(comments);
        res.send(comments);
    });
});

app.get('/users/:id', function(req, res, next) {
    console.log("calling get by id");

    var id = parseInt(req.params.id);
    console.log("id is=" + id);

    var isIdExist = true;

    async.series([
        function(callback) {
            persons.find({ "id": id }, function(err, data) {
                if (err) {
                    console.log(err);

                } else if (data.length) {
                    callback();
                } else {
                    callback("data not found");
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
    email = req.body.email;
    isIdExist = true;
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