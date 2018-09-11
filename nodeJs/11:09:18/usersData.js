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

app.use(express.json());

var users = 
  [
    {
        id:1,
        name:"preeti",
        email:"preeti@gmail.com"
    },
    {
        id:2,
        name:"yogita",
        email:"yogita@gmail.com"
    }
    ]





app.get('/users', function (req, res,next) {
    async.series([
        function(callback) {
              callback(null,users); 
          }
    ],function(error,result){
        res.send(result);
    }) 
});





app.post('/users/:id?', function (req, res,next) {
  //value of id enter by user
    var id = parseInt(req.params.id);
    var email = req.query.email ;
    var isIdExist = false;
    const newUser = {
        id : id,
        name : req.body.name,
        email:req.body.email
      }
      console.log(newUser);

    async.series([

     function(callback){

        users.forEach(function (obj) {
            if(obj.id === id){
                isIdExist = true;
            }
         });

        if(isIdExist === true) {
             callback('User is already added');
           }
        else{
           callback();
        }
},
    function(callback){
     users.push(newUser);
     callback(null,users)
  }

    ],function(error,done){
       if(error){
        res.send(error);
      }
      else{       
        res.send(done);
    }
    }) 
});


app.listen(3017,() => console.log('Listening on port 3017'));

