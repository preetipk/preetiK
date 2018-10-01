var app = angular.module('usersApp', ['ngRoute', 'ui.bootstrap'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userController'
        })
        .when('/company', {
            templateUrl: 'company.html',
            controller: 'companyController'
        })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });

});