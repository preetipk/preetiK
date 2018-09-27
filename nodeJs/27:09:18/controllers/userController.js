app.controller('userController', function($scope, $http) {
    $http({
        method: "GET",
        url: "localhost:3027/user"
    }).then(function(response) {
        $scope.users = response.data;
        console.log(response.data);
    }, function(response) {
        $scope.results = response.statusText;
    });
});