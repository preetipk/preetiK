var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.json());
var bodyParser = require('body-parser');
const User = require('./userSchema');
const Train = require('./trainSchema');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');



mongoose.connect('mongodb://localhost:27017/trainSystem');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.use(express.static(__dirname + "/public"));


app.use(cookieParser());
app.use(session({ secret: "Your secret key", cookie: { maxAge: 3600000 }, saveUninitialized: true, resave: true }));






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


app.post('/trains', function(req, res) {
    console.log("in post controller");
    //let noOfSeats = req.body.noOfSeats;
    let data = req.body;

    console.log("data=" + JSON.stringify(data));

    async.series([
        function(callback) {
            Train.find({ noOfSeats }, function(err, docs) {
                if (docs.length !== 0) {
                    callback('User is  already exist');
                } else {
                    callback()
                }
            })
        },
        function(callback) {
            let trains = new Train(data);
            trains.save(function(err) {
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


app.get('/trains', function(req, res) {
    console.log("console.log calling get");
    async.series([
        function(callback) {
            Train.find({}, function(err, docs) {
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


// app.get('/user/:id', function(req, res) {
//     var id = req.params.id;
//     console.log("id=" + id);
//     User.find({ $and: [{ "_id": mongoose.Types.ObjectId(id) }, { "status": "activated" }] }, function(err, data) {
//         console.log("data=" + data);
//         res.send(data);
//     })
// })




//logout
app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.");
    });
    res.redirect('/');
})






app.listen(3040, () => console.log('Listening on port 3040'));