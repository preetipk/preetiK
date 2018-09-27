var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const user = require('./userSchema');
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
            user.find({ 'status': 'activated' }, function(err, data) {
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


// app.get('/', function(req, res) {
//     res.send("hello world");
// })

app.listen(3027, () => console.log('Listening on port 3027'));