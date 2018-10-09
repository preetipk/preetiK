var app = angular.module('usersApp', ['ngRoute', 'ui.bootstrap'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'dashboardController',
            authenticated: true
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userController'
        })
        .when('/company', {
            templateUrl: 'company.html',
            controller: 'companyController'
        })
        .when('/logout', {
            templateUrl: 'logout.html',
            //controller: 'companyController'
        })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });

});

// app.run(["$rootScope", "$location", "authFact", function($rootScope, $location, authFact) {
//     $rootScope.$on('$routeChangeStart', function(event, next, current) {
//         console.log(event);
//         console.log(current);
//         console.log(next);
//         //if route is authenticated
//         if (next.$$route.authenticated) {
//             var userAuth = authFact.getAccessTocken();
//             if (!userAuth) {
//                 $location.path('/');
//             }
//         }
//     });
// }]);