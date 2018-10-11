var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.json());
var bodyParser = require('body-parser');
const User = require('./userSchema');
const Company = require('./companySchema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');



mongoose.connect('mongodb://localhost:27017/users');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.use(express.static(__dirname + "/public"));


app.use(cookieParser());
app.use(session({ secret: "Your secret key", cookie: { maxAge: 3600000 }, saveUninitialized: true, resave: true }));

app.get('/user', function(req, res) {

    async.series([
        function(callback) {
            User.find({ $or: [{ status: 'activated' }, { status: "deactivated" }] }, function(err, docs) {
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
    console.log("data=" + JSON.stringify(data));

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


app.post("/", function(req, res) {
    req.session.email = req.body.email;
    console.log("req.sess.email=" + req.session.email);

    console.log("inside login connect.js user app")
    console.log("email=" + req.body.email);
    console.log("pwd=" + req.body.password);

    if (!req.body.email || !req.body.password) {
        res.status("400");
        res.send("Invalid details!");
    } else {
        User.find({ $and: [{ "email": req.body.email }, { "password": req.body.password }] }, function(err, docs) {
            console.log("leng=" + docs.length);
            if (docs.length > 0) {
                req.session.docs = docs;
                console.log(" post session=" + req.session.docs);
                res.send("User exist")
                    // res.redirect('#!user');
            } else {
                var data = { "msg": "invalid credentials" };
                req.session.docs = docs;
                console.log(" post fail session=" + req.session.docs);
                console.log("invalid cond login=" + docs.length);
                // res.send("/");
                res.status("400");
                res.redirect('/');
            }
        });
    }
})



app.get('/user/:id', function(req, res) {
    var id = req.params.id;
    console.log("id=" + id);
    User.find({ $and: [{ "_id": mongoose.Types.ObjectId(id) }, { "status": "activated" }] }, function(err, data) {
        console.log("data=" + data);
        res.send(data);
    })
})

app.put('/user/:id', function(req, res) {
    console.log("in update ");
    let id = req.params.id;
    var data = req.body;
    console.log("user=" + JSON.stringify(data));
    console.log("user data=" + data.username);

    console.log("id=" + id);
    // console.log("name in connect for update=" + user.firstName);
    console.log("name=" + req.body.username);

    async.series([
            function(callback) {
                User.find({ 'email': req.body.email },
                    function(err, data) {
                        console.log("data=" + data);
                        if (data.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                User.update({ 'email': req.body.email }, { '$set': { "userInfo.username": req.body.userInfo.username, "password": req.body.password, "email": req.body.email, "userInfo.address": req.body.userInfo.address } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback()
                        }
                    })
            },
            function(callback) {
                User.find({ '_id': id },
                    function(err, docs) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, docs)
                        }
                    })
            },

        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[2]);
            }
        })
})


//logout

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.");
    });
    res.redirect('/');
})


// app.use('/user', function(err, req, res, next) {
//     console.log(err);
//     //Redirect to log in.
//     res.redirect('/');
// });


//put for deactivation
app.put("/users/:_id", function(req, res) {
    // var email = req.params.email;
    console.log("calling put ");
    console.log("id=" + req.params._id);
    var data = req.body;

    console.log("status=" + JSON.stringify(data.status));

    User.findOne({ _id: req.params._id }, function(err, data) {
        if (data == null) {
            res.send(" id not exist");
        } else if (User.find({ "status": "activated" })) {

            User.updateOne({ _id: req.params._id }, { $set: { "status": "deactivated" } }, function(err, data) {
                if (!data) {
                    console.log("not updated");
                    res.send("not updated");
                } else {
                    res.send("data inserted");
                }
            })

        }
    })

})

//put for activated
app.put("/userss/:_id", function(req, res) {
    // var email = req.params.email;
    console.log("calling put ");
    console.log("id=" + req.params._id);

    // var data = req.body;
    console.log("data=" + JSON.stringify(req.body));

    User.findOne({ _id: req.params._id }, function(err, data) {
        if (data == null) {
            // console.log("hjkhj=" + JSON.stringify(data));
            res.send(" id not exist");

        } else {
            User.updateOne({ _id: req.params._id }, { $set: { "status": "activated" } }, function(err, data) {
                if (!data) {
                    console.log("not updated");
                    res.send("not updated");
                } else {
                    res.send("data inserted");
                }
            })

        }


    })

})


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

//companies

app.get('/company', function(req, res) {

    async.series([
        function(callback) {
            Company.find({ $or: [{ "companyInfo.status": 'activated' }, { "companyInfo.status": 'deactivated' }] }, function(err, docs) {
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

app.post('/company', function(req, res) {
    console.log("in post controller");
    let email = req.body.email;
    let data = req.body;
    data.companyInfo.status = "activated";

    async.series([
        function(callback) {
            Company.find({ "companyInfo.userInfo.userEmail": email }, function(err, docs) {
                console.log("data=" + docs);
                if (docs.length != 0) {
                    callback("Company is  already exist");
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
                    callback(null, "Company is  already exist")
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

//status deactivated
app.put("/companies/:_id", function(req, res) {
    // var email = req.params.email;
    console.log("in connect for deactivate put ");
    console.log("id=" + req.params._id);

    Company.find({ _id: req.params._id }, function(err, data) {
        if (data == null) {
            res.send(" id not exist");
        } else {
            Company.update({ _id: req.params._id }, { $set: { "companyInfo.status": "deactivated" } }, function(err, data) {
                if (data.length === 0) {
                    console.log("not updated");
                    res.send("not updated");
                } else {
                    res.send("updated");
                }
            })

        }
    })

})

//status activated
app.put("/companiess/:_id", function(req, res) {
    // var email = req.params.email;
    console.log("in connect for deactivate put ");
    console.log("id=" + req.params._id);

    Company.find({ _id: req.params._id }, function(err, data) {
        if (data == null) {
            res.send(" id not exist");
        } else {
            Company.update({ _id: req.params._id }, { $set: { "companyInfo.status": "activated" } }, function(err, data) {
                if (data.length === 0) {
                    console.log("not updated");
                    res.send("not updated");
                } else {
                    res.send("updated");
                }
            })
        }
    })
});
app.get("/company/:id", function(req, res) {
    var id = req.params.id;
    console.log("inside connect.js cmp app for edit" + id)
    Company.find({ "_id": req.params.id }, function(err, docs) {
        console.log("data=" + docs);
        res.send(docs);
    });
});
app.put('/company/:id', function(req, res) {
    console.log("in connect for update=");
    let id = req.params.id;
    var company = req.body;
    console.log("cmp=" + company);
    console.log("id=" + id);
    async.series([
            function(callback) {
                Company.find({ '_id': req.params.id },
                    function(err, docs) {
                        console.log(docs);
                        if (docs.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                Company.update({ '_id': req.params.id }, { '$set': { companyName: req.body.companyName, "companyInfo.Fax": req.body.companyInfo.Fax, "companyInfo.RegistartionNo": req.body.companyInfo.RegistartionNo, } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback()
                        }
                    })
            },
            function(callback) {
                Company.find({ '_id': id },
                    function(err, docs) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, docs)
                        }
                    })
            },

        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})

app.listen(3044, () => console.log('Listening on port 3044'));