var addition = require('./sample.js');
var exports = module.exports = {};

console.log(addition.addNumber(1, 6));

// var str = function() {
//     console.log("Welcome");
//     addition.addString();
// }
// str();


//var Tutor=require('./Tutorial.js');
exports.NodeTutorial = function() {
    console.log("Learn Node")
    this.pTutor = function() {
        //var PTutor = addition
        addition.addString();
    }
}