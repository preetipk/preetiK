var app = angular.module('usersApp', ['ngRoute', 'ui.bootstrap'])
app.config(function($routeProvider) {
    $routeProvider


        .when('/', {
            templateUrl: 'user.html',
            controller: 'userController'
        })
        // .when('/user', {
        //     templateUrl: 'user.html',
        //     controller: 'userController'
        // })
        .when('/company', {
            templateUrl: 'company.html',
            controller: 'comp[anyController'
        })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });

});