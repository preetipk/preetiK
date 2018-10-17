// app.js



// var app = angular.module('myApp', ['ngRoute'])
// app.config(function($routeProvider) {
//     $routeProvider.when('/', {
//             templateUrl: 'login.html',
//             controller: 'loginCtrl'
//         })
//         .when('/user', {
//             templateUrl: 'user.html',
//             controller: 'userCtrl'
//         })
//         .otherwise({
//             template: "<h1>None</h1><p>Content Not Found</p>"
//         });
// });



// companySchema.js


// const mongoose = require('mongoose');

// const companySchema = mongoose.Schema({
//     companyName: String,
//     companyInfo: String,
//     status: String
// })

// module.exports = mongoose.model("companySchema", companySchema);



// userSchema.js

// const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

// const userSchema = mongoose.Schema({
//     email: { type: String, index: true, unique: true },
//     userInfo: {
//         userName: String,
//         address: String
//     },
//     status: {
//         type: String,
//         enum: ['activated', 'deactivated', 'deleted']

//     },
//     password: String

// });
// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model("userSchema", userSchema);

// userApp.js


// var express = require('express');
// var async = require('async');
// const User = require('./userSchema');
// const Company = require('./companySchema');

// var app = express();
// const mongoose = require('mongoose');
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/appSchema');
// var db = mongoose.connection;

// app.use(express.static(__dirname + "/public"));

// db.once('open', function() { console.log("Connected to MongoDb"); })

// db.on('error', function(err) { console.log(err); })
//     /*
//     app.post('/login', function(req, res) {
//         async.series([
//             function(callback) {
//                 User.find({ $and: [{ 'email': req.body.email }, { 'password': req.body.password }] }, function(err, docs) {
//                     if (docs.length > 0) {
//                         res.redirect('/user');
//                     } else {
//                         callback("Username and Password not match")
//                     }
//                 })
//             }
//         ], function(error, data) {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data);
//             }
//         })
//         console.log(req.body);
//     })
//     */
// app.get('/user', function(req, res) {

//     async.series([
//         function(callback) {
//             User.find({ status: 'activated' }, function(err, docs) {
//                 console.log(docs);
//                 callback(null, docs);
//             })
//         }
//     ], function(error, data) {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(data);
//         }
//     })
// })


// app.post('/user', function(req, res) {


//     let email = req.body.email;
//     let data = req.body;
//     data.status = "activated";

//     async.series([

//         function(callback) {
//             User.find({ "email": email }, function(err, docs) {
//                 if (docs.length !== 0) {
//                     callback('User is  already exist');
//                 } else {
//                     callback()
//                 }
//             })
//         },
//         function(callback) {
//             let user = new User(data);
//             user.save(function(err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     callback(null, "User is added");
//                 }
//             })
//         }
//     ], function(error, data) {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(data[1]);
//         }
//     })
// })


// app.put('/user/:id', function(req, res) {

//     let id = req.params.id;

//     let email = req.body.email;
//     let userName = req.body.userName;
//     let address = req.body.address;

//     async.series([
//             function(callback) {
//                 User.find({ 'email': email },
//                     function(err, docs) {
//                         console.log(docs);
//                         if (docs.length > 0) {
//                             callback()
//                         } else {
//                             callback('Data not found to Update');
//                         }
//                     })
//             },
//             function(callback) {
//                 User.update({ 'email': email }, { '$set': { 'userInfo.userName': userName, 'userInfo.address': address, 'status': status, 'password': password } },
//                     function(err) {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         } else {
//                             callback()
//                         }
//                     })
//             },
//             function(callback) {
//                 User.find({ '_id': id },
//                     function(err, docs) {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         } else {
//                             callback(null, docs)
//                         }
//                     })
//             },

//         ],
//         function(error, data) {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data[2]);
//             }
//         })
// })


// app.delete('/user/:id', function(req, res) {

//     let id = req.params.id;
//     async.series([
//         function(callback) {

//             User.find({ $or: [{ "_id": id }, { "email": id }] }, function(err, docs) {
//                 if (docs.length !== 0) {
//                     callback();
//                 } else {
//                     callback('user does not exist');
//                 }
//             })
//         },
//         function(callback) {
//             User.remove({ $or: [{ "_id": id }, { "email": id }] }, function(err) {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 } else {
//                     callback(null, 'DataDeleted Successfully')
//                 }
//             })
//         }

//     ], function(error, data) {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(data[1]);
//         }
//     })
// })




// var server = app.listen(8090, function() {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)
// })


// app.js

// var app = angular.module('myApp', ['ngRoute'])
// app.config(function($routeProvider) {
//     $routeProvider.when('/', {
//             templateUrl: 'login.html',
//             controller: 'loginCtrl'
//         })
//         .when('/user', {
//             templateUrl: 'user.html',
//             controller: 'userCtrl'
//         })
//         .otherwise({
//             template: "<h1>None</h1><p>Content Not Found</p>"
//         });
// });


// index.html


// <html ng-app="myApp">

// <head>
//     <title>MEAN APPLICATION</title>
//     <script src="angular/angular.min.js"></script>
//     <script src="angular/angular-route.min.js"></script>
//     <script src="app.js"></script>
// </head>

// <body>
//     <ng-view></ng-view>
//     <script src="loginCtrl.js"></script>
//     <script src="userCtrl.js"></script>

// </body>

// </html>


// login.html


// <form name="myForm">
//     <table>
//         <tr>
//             <td>Email</td>
//             <td><input type="text" name="email" ng-model="email" required></td>
//             <td><span ng-show="myForm.email.$touched && myForm.email.$invalid">Oops! Email field is required.</span></td>
//         </tr>
//         <tr>
//             <td>Password</td>
//             <td><input type="password" name="password" ng-model="password" required></td>
//             <td><span ng-show="myForm.password.$touched && myForm.password.$invalid">Oops! Password field is required.</span></td>
//         </tr>
//         <tr>
//             <td>
//                 <!--Here is using of ng-disabled-->
//                 <input type="submit" ng-click="submit()" ng-disabled="myForm.$invalid || myForm.$pristine" />
//             </td>
//         </tr>
//     </table>
// </form>


// loginController.js

// app.controller("loginCtrl", ['$scope', '$http', function($scope, $http) {

// $scope.submit = function submit() {
//     $scope.data = {};
//     $scope.data.email = $scope.email;
//     $scope.data.password = $scope.password;
//     console.log($scope.email);
//     console.log($scope.password);
//     $http.post('/login', $scope.data).then(function(response) {
//         console.log(response);
//     });
// }
// }]);


// user.html


// <h1>User.html page</h1>

// <table>
//     <tr>
//         <td>UserName</td>
//         <td><input type="text" ng-model="username"></td>
//     </tr>
//     <tr>
//         <td>Address</td>
//         <td><input type="text" ng-model="address"></td>
//     </tr>
//     <tr>
//         <td>Email</td>
//         <td><input type="text" ng-model="email"></td>
//     </tr>
//     <tr>
//         <td>Password</td>
//         <td><input type="text" ng-model="password"></td>
//     </tr>
//     <tr>
//         <th><input id="submit" type="submit" name="submit" value="Adduser" ng-click="adduser()" /></th>
//     </tr>
// </table>


// usercontroller


// app.controller("userCtrl", ['$scope', '$http', function($scope, $http) {

// $scope.adduser = function() {
//     $scope.data = {}
//     $scope.data.
//     $http.post('/contactlist', $scope.data).success(function(response) {
//         console.log(response);
//         refresh();
//     });
// };

// var refresh = function() {
//     $http.get('/user').then(function(response) {
//         console.log("I got the data I requested");
//         $scope.userlist = response.data;
//         console.log($scope.userlist);
//     });
// };

// refresh();

// $scope.remove = function(id) {
//     console.log(id);
//     $http.delete('/user/' + id).then(function(response) {
//         refresh();
//     });
// };


// }]);