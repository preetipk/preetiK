var app =angular.module('usersApp', ['ngRoute','ui.bootstrap'])
app.config(function ($routeProvider) {
    $routeProvider
    

    .when('/', {
        templateUrl: 'users.html',
        controller: 'usersController'
    })
    .when('/users', {
        templateUrl: 'users.html',
        controller: 'usersController'
    })
    .when('/user/:id', {
        templateUrl: 'user.html',
        controller: 'userController'
    })
    .when('/user/:id/update', {
        templateUrl: 'updateUser.html',
        controller: 'userController'
    })
    .when('/students', {
        templateUrl: 'students.html',
        controller: 'studentsCtrl'
    })
    
});