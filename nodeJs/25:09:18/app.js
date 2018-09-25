var express = require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var bodyParser = require('body-parser');
const Students = require('./schema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); });

router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});
app.use('/api', router)

router.post('/students', function(req, res) {
    console.log("calling post method");
    studentId = req.body.studentId;
    console.log("StudentId=" + studentId);

    let newStudent = new Students();

    newStudent.studentId = studentId
    newStudent.studName = req.body.studName;
    newStudent.address = req.body.address;
    newStudent.country = req.body.country;
    newStudent.state = req.body.state;
    newStudent.status = "present";
    newStudent.Schoolemail = req.body.Schoolemail
    async.series([
        function(callback) {
            Students.find({ "studentId": studentId }, function(err, data) {
                console.log("data=" + JSON.stringify(data));
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback("studentalready exist or status is dactivate");
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            newStudent.save(function(err, data) {
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
});

router.get("/studentss", function(req, res) {
    console.log("get all students");

    Students.find({}, function(err, data) {
        console.log("data=" + data);
        if (!data) {
            res.send("error");
        } else {
            console.log("lib=" + data);
            res.json(data);
        }
    })
})


// router.get('/students', function(req, res) {
//     async.series([
//         function(callback) {
//             Students.find({ "status": "present" }, function(err, data) {
//                 console.log("data is=" + data);
//                 if (err) {
//                     console.log(err);
//                 } else if (data.length > 0) {
//                     callback(null, data);
//                 } else {
//                     callback("data not found");
//                 }

//             })
//         },
//     ], function(error, Data) {
//         if (error) {
//             res.send(error);
//         } else {
//             console.log("data=" + Data);
//             res.send(Data);
//         }
//     })
// });


router.put('/studentUpdates/:id', function(req, res) {
    console.log("calling put method");
    id = parseInt(req.params.id);
    console.log("studentID=" + id);

    let newStudent = {};
    newStudent.studName = req.body.studName;
    newStudent.address = req.body.address;
    newStudent.country = req.body.country;
    newStudent.state = req.body.state;
    newStudent.Schoolemail = req.body.Schoolemail

    console.log("student=" + JSON.stringify(newStudent));

    async.series([
        function(callback) {
            Students.find({ "studentId": id }, function(err, data) {
                console.log("data=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback();
                } else {
                    callback("id not exist in records");
                }
            })
        },
        function(callback) {
            Students.updateOne({ "studentId": id }, newStudent, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, "data with " + id + " updated successfully");
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

router.delete('/student/:studentId', function(req, res) {
    console.log("calling delete method");
    id = req.params.studentId;
    console.log("student=" + id);

    async.series([
        function(callback) {
            Students.find({ $and: [{ "status": "present" }, { "studentId": id }] }, function(err, data) {
                console.log("data" + data);
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback();
                } else {
                    callback("student not exist in recoprd");
                }
            })
        },
        function(callback) {
            Students.updateMany({ "studentId": id }, { $set: { "status": "absent" } }, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, "data with " + id + " deleted successfully");
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

app.listen(3000, () => console.log('Listening on port 3000'));