var app =angular.module('myApp', ['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider
    
    .when('/index1', {
        templateUrl: 'personalInfo/index1.html',
        controller: 'personalInfo'
    })
    .when('/calculator/:firstnumber/:secondnumber', {
        templateUrl: 'calculator/calculator.html',
        controller: 'calculatorController'
    })
    .when('/calculator/:firstnumber', {
        templateUrl: 'calculator/calculator.html',
        controller: 'calculatorController'
    })
    .when('/calculator', {
        templateUrl: 'calculator/calculator.html',
        controller: 'calculatorController'
    })
    .when('/post', {
        templateUrl: 'angularPromises/post.html',
        controller: 'postController'
    })
    
});