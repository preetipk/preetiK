var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json());
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//var query = require('querystring');
app.use(express.static('public'));


var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/employee"); //users database
var Schema = new mongoose.Schema({ //created schema
    name: String,
    email: String,
    id: Number,
});
Schema.ObjectId = mongoose.Types.ObjectId;
var persons = mongoose.model("persons", Schema);
app.get("/users", function(req, res) {

    persons.find({ name: 'Preeti' }, function(error, comments) {
        console.log(comments);
        res.send(comments);
    });

    //console.log(comments);
})

app.post("/users", function(req, res) {

    //var person1 = new persons({ id: 2, name: 'yogita', email: 'yogita@gmail.com' });
    var newPerson = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email
    }
    console.log(JSON.stringify(newPerson));
    var person1 = new persons(newPerson)

    // save model to database
    person1.save(function(err, persons) {
        if (err) return console.error(err);
        console.log(persons + " saved to collection.");
        res.send(persons);
    });

})

app.put("/users/:id", function(req, res) {

    // create mongose method to update a existing record into collection
    var id = req.params.persons_id;
    // Schema.id = mongoose.Types.ObjectId;
    //console.log("schema id=" + Schema.ObjectId)
    console.log("id=" + id)
    var data = {

            name: req.body.name,
            email: req.body.email,

        }
        //console.log("id from url=" + data.id);
    console.log(JSON.stringify(data));

    // save the user
    persons.findByIdAndUpdate(id, data, function(err, persons) {
        if (err) return console.error(err);
        console.log(persons + " saved to collection.");
        res.send(data);
    });

})



app.listen(3050, () => console.log('Listening on port 3050'));