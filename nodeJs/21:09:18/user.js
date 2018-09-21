var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const user = require('./userSchema');
const Company = require('./company_Schema');
//const brands = require('./brandSchema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.get("/AllUsers", function(req, res) {
    console.log("get all ");
    user.find({}, function(error, data) {
        if (error) {
            res.send("error");
        } else {
            console.log("users=" + JSON.stringify(data));
            res.json(data);
        }
    })
})

app.get('/user/:searchPattern', function(req, res) {
    console.log("get by search pattern");
    var regexp = new RegExp("^" + req.params.searchPattern);
    //var searchPattern = req.params.searchPattern;
    console.log("search pattern=" + regexp);
    async.series([
        function(callback) {
            user.find({ "userInfo.userName": regexp }, function(err, data) {
                console.log(data);
                callback(null, data);
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
    console.log("calling post method");
    let newUser = new user(req.body);
    newUser.status = "activated";
    //var allUsers = req.body;
    // newUser = allUsers;
    console.log("new user=" + newUser);
    email = req.body.email;
    console.log("email=" + email);

    console.log("new user=" + newUser);
    async.series([
        function(callback) {
            user.find({ "email": email }, function(err, data) {
                console.log("data=" + JSON.stringify(data));
                if (err) {
                    console.log(err);

                } else if (data.length !== 0) {
                    callback("data already exist");
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            newUser.save(function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(data);
                    callback(data);

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

app.put('/user/:id', function(req, res) {
    console.log("calling put method by id");
    let newUser = req.body;
    var id = req.params.id;
    //console.log("company_name=" + company_name);


    console.log("new user=" + JSON.stringify(newUser));

    async.series([
        function(callback) {
            user.find({ "_id": id }, function(err, data) {
                console.log("data=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length > 0) {
                    callback();
                } else {
                    callback("user not exist in records");
                }
            })


        },
        function(callback) {
            user.updateOne({ "_id": id }, newUser, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log("asd" + JSON.stringify(newUser));
                    callback(null, newUser);
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
    console.log("calling put method by email");


    var newUsers = req.body;
    console.log("new user=" + JSON.stringify(newUsers));

    var emailId = req.params.email;
    console.log("email=" + emailId);

    async.series([
        function(callback) {
            user.find({ $and: [{ "email": emailId }, { status: { "$ne": 'deleted' } }] }, function(err, data) {
                console.log("data=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback();
                } else {
                    callback("user not exist in records");
                }
            })
        },
        function(callback) {
            user.updateOne({ "email": emailId }, newUsers, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(newUsers);
                    callback(null, newUsers);
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


app.put('/userss/:id', function(req, res) {

    let id = req.params.id;
    let status = req.body.status;

    async.series([
            function(callback) {
                user.find({ $and: [{ $or: [{ 'email': id }, { '_id': id }] }, { status: { "$ne": 'deleted' } }] },
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
                user.update({ $or: [{ 'email': id }, { '_id': id }] }, { '$set': { 'status': status } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'status is update')
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


app.delete('/user/:id', function(req, res) {
    console.log("calling delete method");
    var id = req.params.id;
    console.log("_id=" + id);

    async.series([
        function(callback) {
            user.find({ $and: [{ "_id": id }, { status: { "$ne": 'deleted' } }] }, function(err, data) {
                console.log("data=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback();
                } else {
                    callback("User not found");
                }
            })
        },
        function(callback) {
            user.updateOne({ "_id": id }, { $set: { "status": "deleted" } }, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, "user deleted");
                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            //console.log("status=" + done);
            res.send(done);
        }
    })
})


app.get('/company', function(req, res) {

    async.series([
        function(callback) {
            Company.find({ 'companyInfo.status': 'activated' }, function(err, data) {
                console.log(data);
                callback(null, data);
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


app.get('/company/:companyName', function(req, res) {
    console.log("calling get aggregate")
    async.series([
        function(callback) {
            Company.aggregate([{ $match: { "companyInfo.fax": { $gt: 700000 } } }], function(err, data) {
                if (data.length !== 0) {
                    callback()
                } else {
                    callback('User isnot exist');
                }
            })
        },
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
})

app.post('/company', function(req, res) {

    let email = req.body.companyInfo.userInfo.userEmail;
    console.log("email=" + email);
    let company = new Company(req.body);
    company.companyInfo.status = "activated";

    async.series([
        function(callback) {
            user.find({ "email": email }, function(err, data) {
                console.log("data=" + data);
                if (data.length !== 0) {
                    callback()
                } else {
                    callback('User is not exist');
                }
            })
        },
        function(callback) {

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
            res.send(data);
        }
    })
})

app.put('/companyUpdate/:id', function(req, res) {
    console.log("calling put method");
    let id = req.params.id;
    console.log("id=" + id);
    var allCompany = req.body;
    console.log("all company=" + JSON.stringify(allCompany));
    let email = allCompany.companyInfo.userInfo.userEmail;
    console.log("email" + email);
    var fax = allCompany.companyInfo.fax;
    var RegistartionNo = allCompany.companyInfo.RegistartionNo;

    async.series([
            function(callback) {
                user.find({ 'email': email }, [{ $elemMatch: { 'email': email } }],
                    function(err, data) {
                        console.log("data" + data);
                        if (data.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                Company.update({ '_id': id }, { '$set': { 'companyInfo.RegistartionNo': RegistartionNo, 'companyInfo.fax': fax } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'company info is update')
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


app.delete('/company/:id', function(req, res) {
    let id = req.params.id;

    async.series([
        function(callback) {
            Company.find({ "_id": id }, function(err, data) {
                if (data.length !== 0) {
                    callback();
                } else {
                    callback('Company does not exist');
                }
            })
        },
        function(callback) {
            Company.update({ "_id": id }, { '$set': { 'companyInfo.status': 'deleted' } }, function(err) {
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
            res.send(data[1]);
        }
    })
})



app.listen(3027, () => console.log('Listening on port 3027'));