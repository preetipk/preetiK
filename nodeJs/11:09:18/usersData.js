var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json());
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var async = require('async');

app.use(express.json());

var users = [{
        id: 1,
        name: "preeti",
        email: "preeti@gmail.com"
    },
    {
        id: 2,
        name: "yogita",
        email: "yogita@gmail.com"
    }
]

app.get('/users', function(req, res, next) {
    async.series([
        function(callback) {
            callback(null, users);
        }
    ], function(error, data) {
        res.send(data);
    })
});





app.post('/users', function(req, res, next) {
    //value of id enter by user
    var id = req.body.id;
    var isIdExist = false;
    var newUser = {
        id: id,
        name: req.body.name,
        email: req.body.email
    }
    console.log(newUser);

    async.series([
        function(callback) {
            users.forEach(function(obj) {
                if (obj.id === id) {
                    isIdExist = true;
                }
            });
            if (isIdExist === true) {
                callback('User is already added');
            } else {
                callback();
            }
        },
        function(callback) {
            users.push(newUser);
            callback(null, users)
        }

    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
});

app.put('/users/:id?', function(req, res, next) {
    var id = parseInt(req.params.id);
    var isIdExist = false;
    var newUser = {
        id: id,
        name: req.body.name,
        email: req.body.email
    }
    console.log(newUser);

    async.series([
        function(callback) {
            users.forEach(function(obj) {
                if (obj.id === id) {
                    isIdExist = true;
                }
            });

            if (isIdExist === true) {
                //callback('User is exist');
                callback();
            } else {
                callback('User is not exist');
            }
        },
        function(callback) {
            users.push(newUser);
            callback(null, users)
        }

    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.delete('/users/:id?', function(req, res, next) {
    var id = parseInt(req.params.id);
    var isIdExist = false;
    var newUser = {
        //id : id,
        name: req.body.name,
        email: req.body.email
    }
    console.log(newUser);

    async.series([
        function(callback) {
            users.forEach(function(obj) {
                if (obj.id === id) {
                    isIdExist = true;
                }
            });

            if (isIdExist === true) {
                //callback('User is exist');
                callback();
            } else {
                callback('User is not exist');
            }
        },
        function(callback) {
            const index = users.indexOf(users);
            users.splice(index, 1);
            callback(null, newUser)
        }

    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})


app.listen(3017, () => console.log('Listening on port 3017'));