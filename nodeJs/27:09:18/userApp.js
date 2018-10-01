var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const User = require('./userSchema');
const Company = require('./companySchema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.use(express.static(__dirname + "/public"));

app.get('/user', function(req, res) {

    async.series([
        function(callback) {
            User.find({ status: 'activated' }, function(err, docs) {
                //console.log(docs);
                callback(null, docs);
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
})

app.post('/user', function(req, res) {
    console.log("in post controller");
    let email = req.body.email;
    let data = req.body;
    data.status = "activated";

    async.series([

        function(callback) {
            User.find({ "email": email }, function(err, docs) {
                if (docs.length !== 0) {
                    callback('User is  already exist');
                } else {
                    callback()
                }
            })
        },
        function(callback) {
            let user = new User(data);
            user.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "User is added");
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data[1]);
        }
    })
})

app.post('/login', function(req, res) {
    console.log("in post controller");
    let email = req.body.email;
    let password = req.body.password;
    let data = req.body;
    data.status = "activated";

    async.series([

        function(callback) {
            User.find({ $and: [{ "email": email }, { "password": password }] }, function(err, data) {
                if (data.length !== 0) {
                    callback('Useralready exist');
                }
                //else {
                //     callback()
                // }
            })
        },
        // function(callback) {
        //     let user = new User(data);
        //     user.save(function(err) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             callback(null, "User is added");
        //         }
        //     })
        // }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data[1]);
        }
    })
})

app.get('/user/:id', function(req, res) {
    var id = req.params.id;
    console.log("id=" + id);
    User.find({ "_id": mongoose.Types.ObjectId(id) }, function(err, data) {
        console.log("data=" + data);
        res.json(data);
    })
})

app.get('/company/:id', function(req, res) {
    var id = req.params.id;
    console.log("id=" + id);
    User.find({ "_id": mongoose.Types.ObjectId(id) }, function(err, data) {
        console.log("data=" + data);
        res.send(data);
    })
})

// app.put('/user/:id', function(req, res) {

//     let id = req.params.id;
//     console.log("id in update=" + id);

//     var email = req.body.email;
//     console.log("email=" + email);

//     var username = req.body.username;
//     console.log("email=" + username);

//     async.series([
//             function(callback) {
//                 User.find({ "email": req.body.email },
//                     function(err, data) {
//                         console.log(data);
//                         if (data.length > 0) {
//                             callback()
//                         } else {
//                             callback('Data not found to Update');
//                         }
//                     })
//             },
//             function(callback) {
//                 User.update({ 'email': req.body.email }, { '$set': { "userInfo.username": req.body.username, "password": req.body.password, "email": req.body.email, "userInfo.address": req.body.address } },
//                     function(err) {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         } else {
//                             callback()
//                         }
//                     })
//             },
//             function(callback) {
//                 User.find({ '_id': id },
//                     function(err, docs) {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         } else {
//                             callback(null, docs)
//                         }
//                     })
//             },

//         ],
//         function(error, data) {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data[2]);
//             }
//         })
// })




app.delete('/user/:id', function(req, res) {
    console.log("calling delete ");
    let id = req.params.id;
    async.series([
        function(callback) {

            User.find({ "_id": id }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('user does not exist');
                }
            })
        },
        function(callback) {
            User.remove({ "_id": id }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, 'DataDeleted Successfully')
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
})


app.get('/company', function(req, res) {

    async.series([
        function(callback) {
            Company.find({ 'companyInfo.status': 'activated' }, function(err, docs) {
                //console.log(docs);
                callback(null, docs);
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

app.post('/company', function(req, res) {
    console.log("in post controller");
    let email = req.body.email;
    let data = req.body;
    data.companyInfo.status = "activated";

    async.series([

        function(callback) {
            Company.find({ "email": email }, function(err, docs) {
                console.log("data=" + data);
                if (docs.length <= 0) {
                    callback('Company is  already exist');
                } else {
                    callback()
                }
            })
        },
        function(callback) {
            let company = new Company(data);
            company.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "company is added");
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data[1]);
        }
    })
})



app.delete('/company/:id', function(req, res) {
    console.log("calling delete ");
    let id = req.params.id;
    async.series([
        function(callback) {
            console.log("in callback")
            Company.find({ "_id": id }, function(err, data) {
                console.log("data=" + data);
                if (data.length !== 0) {
                    callback();
                } else {
                    callback('user does not exist');
                }
            })
        },
        function(callback) {
            Company.remove({ "_id": id }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, 'Data Deleted Successfully')
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
})





app.listen(3027, () => console.log('Listening on port 3027'));