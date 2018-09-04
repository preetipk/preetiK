var express = require('express');
var app = express();
app.use(express.json());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const info =[
    {firstName:'preeti', lastName:'kulkarni'}
];

app.get('/index', function (req, res) {
   res.sendFile('/Users/preeti/Desktop/app/webdir/nodeJs/expressApp/index.html');
});

app.post('/submit-student-data', function (req, res) {
  const information ={
      firstName: req.body.firstName,
      lastName: req.body.lastName
  }
  info.push(information);
  res.send(information)
});

app.put('/update-data:id', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;

   res.send(name + ' Updated Successfully!');
});

// app.delete('/delete-data', function (req, res) {
//     res.send('DELETE Request');
// });



var server = app.listen(5004, function () {
   console.log('Node server is running..');
});

