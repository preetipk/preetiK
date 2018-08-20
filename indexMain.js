var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm",
    })
    .when("/index", {
        templateUrl : "index.htm",
        controller : "londonCtrl"
    })
    .when("/calculator", {
        templateUrl : "calculator.htm",
        controller : "parisCtrl"
    });
});
