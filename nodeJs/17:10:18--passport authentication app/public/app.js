var app = angular.module('usersApp', ['ngRoute', 'ui.bootstrap', 'ngCookies'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })

    .when('/user', {
            templateUrl: 'user.html',
            controller: 'userController',
            authenticated: true
        })
        .when('/company', {
            templateUrl: 'company.html',
            controller: 'companyController',
            authenticated: true
        })
        // .when('/logout', {
        //     templateUrl: 'logout.html',
        //     //controller: 'companyController'
        // })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });

});

app.run(["$rootScope", "$location", "userModel", function($rootScope, $location, userModel) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        console.log("event=" + event);
        console.log("current=" + current);
        console.log("next=" + next);
        //if route is authenticated
        if (next.$$route.authenticated) {
            console.log("in check");
            //svar userAuth = userModel.getAccessTocken();
            if (!userModel.getAuthStatus()) {
                $location.path('/');
            }
        }
        if (next.$$route.originalPath == '/') {
            console.log('login page');
            if (userModel.getAuthStatus()) {
                $location.path(current.$$route.originalPath);
            }
        }

    });
}]);