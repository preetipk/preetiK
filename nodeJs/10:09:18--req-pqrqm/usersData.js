var express = require('express');
var app = express();
var fs=require("fs");
app.use(express.json());
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(express.static('public'));
 var async = require('async');

 

 app.get("/user",async function get(req, res, next) {
 function getData(callback) {
   fs.readFile('users.json', 'utf8', function(err, data) {
     if (err)
       callback(err);
       
     callback(null, data);
   });
 }
 
 getData(function(err, data) {
     if (err) {
       console.log('getting some problem');
     }
     res.send( data );
     console.log(data);
   
 });
 
 
 }) 
 app.listen(3016,() => console.log('Listening on port 3016'));


