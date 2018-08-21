// var app = angular.module("myApp",[]);

var app =angular.module('myApp', ['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider
    
    .when('/angularGetCall/:id', {
        templateUrl: 'angularGetCall.html',
        controller: 'getCallController'
    })
    .when('/angularGetCall/:userId', {
        templateUrl: 'angularGetCall.html',
        controller: 'getCallController'
    })
    .when('/angularGetCall', {
        templateUrl: 'angularGetCall.html',
        controller: 'getCallController'
    })
});