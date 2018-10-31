// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error("Whoops!")), 1000);
// });

// // reject runs the second function in .then
// promise.then(
//     result => console.log(result), // doesn't run
//     error => console.log(error) // shows "Error: Whoops!" after 1 second
// );


var request = require("request");
var userDetails;

function getData(url) {
    // Setting URL and headers for request
    var options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

var errHandler = function(err) {
    console.log(err);
}

function main() {
    var userProfileURL = "http://plnkr.co/edit/gSQLOOs3AK3jbcCBKuna?p=preview";
    var dataPromise = getData(userProfileURL);
    // Get user details after that get followers from URL
    dataPromise.then(JSON.parse, errHandler)
        .then(function(result) {
            userDetails = result;
            // Do one more async operation here
            var anotherPromise = getData(userDetails.followers_url).then(JSON.parse);
            return anotherPromise;
        }, errHandler)
        .then(function(data) {
            console.log(data)
        }, errHandler);
}


main();