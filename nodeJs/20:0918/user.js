var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const user = require('./userSchema');
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

app.post('/newUser', function(req, res) {
    console.log("calling post method");
    let newUser = new user(req.body);
    newUser.status = "activated";

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
            newUser.save({ "status": "activated" }, function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(data);
                    callback("data inserted successfully");
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

app.put('/UpdatesById/:id', function(req, res) {
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
                } else if (data.length) {
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
                    console.log(company);
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

app.put('/UpdatesByEmail/:email', function(req, res) {
    console.log("calling put method by email");
    var email = req.params.email;
    console.log("email=" + email);
    var allUser = req.body;
    console.log("all users" + JSON.stringify(allUser.userInfo.userName));

    var newUsers = {};
    //console.log("hghj" + newUsers);
    newUsers.email = email;
    newUsers.userInfo.userName = allUser.userInfo.userName;
    newUsers.userInfo.address = allUser.userInfo.address

    console.log("all users=" + newUsers);
    console.log("new user=" + JSON.stringify(newUsers));

    async.series([
        function(callback) {
            user.findOne({ "email": email }, function(err, data) {
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
            user.updateOne({ "email": email }, newUsers, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(newUser);
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


app.put('/UpdatesStatus/:id', function(req, res) {
    console.log("calling put method by id or email");
    var id = req.params.id;
    console.log("email=" + id);

    async.series([
        function(callback) {
            user.findOne({ $and: [{ $or: [{ "email": id }, { "_id": id }] }, { $not: { "status": "deleted" } }] }, function(err, data) {
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
            user.updateOne({ $or: [{ "email": id }, { "_id": id }] }, { $set: { "status": "activated" } }, newUsers, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(newUser);
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


app.delete('/DeleteUser/:id', function(req, res) {
    console.log("calling delete method");
    var id = req.params.id;
    console.log("_id=" + id);

    async.series([
        function(callback) {
            user.find({ "_id": id }, function(err, data) {
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


app.listen(3026, () => console.log('Listening on port 3026'));