var express = require('express');
var app = express();
var async = require('async');

var data = "kulkarni";
//var stack=[];
var stack = {};
stack.firstName = function(callback) {
    var userName = "Preeti"
    callback(null, userName);
}

stack.middleName = function(callback) {
    var mname = "Shyamkant";
    callback(null, mname);
}
stack.lastName = function(callback) {
    callback(null, data);
}


async.parallel(stack, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }

})

