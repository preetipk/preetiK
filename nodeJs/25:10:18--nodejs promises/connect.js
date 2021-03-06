var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.json());
var bodyParser = require('body-parser');
const User = require('./userSchema');
const Train = require('./trainSchema');
const Booking = require('./bookingSchema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var promise = require('promise');


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
    data.status = "booked";
    var timeInMss = new Date();
    var date = timeInMss.toISOString();
    console.log("timestamp=" + date);
    console.log("data=" + JSON.stringify(data));

    async.series([
            function(callback) {
                Train.find({ "$nor": [{ "noOfSeats": { "$lte": 0 } }] },
                    function(err, docs) {
                        if (docs.length !== 0) {
                            console.log("documents=" + docs)
                            callback();
                        } else {
                            callback("Booking is not available")
                        }
                    })
            },
            function(callback) {
                let bookingData = new Booking(data);
                bookingData.save(function(err) {
                    if (err) {
                        console.log("error=" + err);
                    } else {
                        callback(null, "Booking Done");
                    }
                })
            }
        ],
        function(error, data) {
            if (error) {
                res.send("error=" + error);
            } else {
                res.send(data[1]);
            }
        })
})


app.get('/trains', function(req, res) {
    console.log("calling get");
    trainFind().then(function(result) {
        res.send(result);
    })

})

app.get('/trains/:id', function(req, res) {
    var id = req.params.id;
    console.log("id=" + id);
    Train.find({ "_id": mongoose.Types.ObjectId(id) }, function(err, data) {
        console.log("data=" + data);
        res.send(data);
    })
})

//find the train info having available seats more than 0s
var trainFind = function() {
    return new promise(function(resolve, reject) {
        Train.find({ "$nor": [{ "noOfSeats": { "$lte": 0 } }] },
            function(err, data) {
                console.log("data=" + data);
                if (data.length > 0) {
                    resolve()
                } else {
                    reject('Data not found to Update');
                }
            })
    })

}

//update bookings
var trainUpdate = function() {
    return new promise(function(resolve, reject) {
        Train.updateOne({ "_id": req.params.id }, { $inc: { noOfSeats: (-1) } },
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
    })
}

//find the updated part
var finalFind = function() {
    return new promise(function(resolve, reject) {
        Train.find({ '_id': id },
            function(err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(null, docs)
                }
            })
    })
}

app.put('/trains/:id', function(req, res) {
    console.log("in update ");
    let id = req.params.id;
    var data = req.body;
    console.log("user=" + JSON.stringify(data));
    console.log("user data=" + data.noOfSeats);

    console.log("id=" + id);
    // console.log("name in connect for update=" + user.firstName);
    console.log("name=" + req.body.username);

    //calling promise
    trainFind().then(function(result) {
        return trainUpdate(res.send(result));
    }).then(function(result) {
        return finalFind(res.send(result));
    }).then(function(result) {
        res.send(result);
    })

})


//logout
app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.");
    });
    res.redirect('/');
})


app.get('/bookingDetails', function(req, res) {
    console.log("calling get");
    let promise = new Promise(function(resolve, reject) {
        async.series([
            function(callback) {
                Booking.find({}, function(err, docs) {
                    //console.log(docs);
                    callback(null, docs);
                })
            }
        ], function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(res.send(data));
            }
        })
    })
})



app.listen(3047, () => console.log('Listening on port 3047'));