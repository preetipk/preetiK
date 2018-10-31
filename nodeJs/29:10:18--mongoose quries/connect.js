var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.json());
var bodyParser = require('body-parser');
const Company = require('./companySchema');
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

app.get('/User', function(req, res) {
    console.log("calling get");

    async.series([
        function(callback) {
            Company.find({ "companyInfo.status": { $in: ['activated', ""] } }, function(err, docs) {
                if (err) {
                    callback("data not found");
                } else {
                    callback(null, docs);
                }

            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(JSON.stringify(data));
        }
    })

})

app.get('/Users', function(req, res) {
    console.log("calling get of ifNull");

    async.series([
        function(callback) {
            Company.aggregate([{
                    $project: {
                        "companyInfo.status": { $ifNull: ["$companyInfo.status", "Unspecified"] }
                    }
                }], function(err, data) {
                    if (err) {
                        callback("data not found");
                    } else {
                        callback(null, data);
                    }
                }

            )
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(JSON.stringify(data));
        }
    })

})

app.get('/user1', function(req, res) {
    console.log("calling get");

    async.series([
        function(callback) {
            Company.aggregate(
                [
                    { $project: { "companyInfo.Fax": { $add: ["$companyInfo.Fax", "00000"] } } }
                ],
                function(err, data) {
                    if (err) {
                        callback("data not found");
                    } else {
                        callback(null, data);
                    }
                }
            )
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(JSON.stringify(data));
        }
    })

})

app.get('/User', function(req, res) {
    console.log("calling get");

    async.series([
        function(callback) {
            Company.aggregate(
                [
                    { $project: { "CompanyInfo.Fax": { $multiply: ["CompanyInfo.Fax", 2] } } }
                ],
                function(err, data) {
                    if (err) {
                        callback("data not found");
                    } else {
                        callback(null, data);
                    }
                }
            )
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(JSON.stringify(data));
        }
    })

})


app.get('/User123', function(req, res) {
    console.log("calling get");

    async.series([
        function(callback) {
            Company.aggregate(
                [
                    { $project: { "CompanyInfo.Fax": { $multiply: ["CompanyInfo.Fax" * "CompanyInfo.RegistartionNo"] } } }
                ],
                function(err, data) {
                    if (err) {
                        callback("data not found");
                    } else {
                        callback(null, data);
                    }
                }
            )
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(JSON.stringify(data));
        }
    })

})


app.get('/user/:id', function(req, res) {
    var id = req.params.id;
    console.log("id=" + id);
    Company.find({ $and: [{ "_id": mongoose.Types.ObjectId(id) }, { "status": "activated" }] }, function(err, data) {
        console.log("data=" + data);
        res.send(data);
    })
})


Company.count({ "companyInfo.status": 'activated' }, function(err, count) {
    console.log("No Of Records in company Schema:" + count);
});


app.get('/Userss', function(req, res) {
    console.log("calling get");

    async.series([
        function(callback) {
            Company.aggregate(
                [{
                    $project: {

                        discount: {
                            $cond: { if: { $gte: ["$companyInfo.RegistartionNo", 250] }, then: 30, else: 20 }
                        }
                    }

                }],
                function(err, data) {
                    if (err) {
                        callback("data not found");
                    } else {
                        callback(null, data);
                    }
                }
            )
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(JSON.stringify(data));
        }
    })

})

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
});


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
app.listen(3047, () => console.log('Listening on port 3047'));