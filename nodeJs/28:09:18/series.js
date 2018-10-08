var express = require('express');
var app = express();
var async = require('async');
// async.waterfall([
//     function(callback) {
//         callback(null, 'one', 'two');
//     },
//     function(arg1, arg2, callback) {
//         // arg1 now equals 'one' and arg2 now equals 'two'
//         callback(null, 'three');
//     },
//     function(arg1, callback) {
//         // arg1 now equals 'three'
//         callback(null, 'done');
//     }
// ], function(err, result) {
//     // result now equals 'done'    
// });
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

// stack.push(functionOne);
// stack.push(functionTwo);
// stack.push(functionThree);

async.parallel(stack, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }

})

//app.listen(3040, () => console.log('Listening on port 3040'));