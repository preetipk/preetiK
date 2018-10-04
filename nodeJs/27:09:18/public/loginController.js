app.controller("loginController", ['$scope', '$http', '$location', function($scope, $http, $location) {



    $scope.submit = function submit() {
        $scope.data = {};
        $scope.data.email = $scope.email;
        $scope.data.password = $scope.password;
        console.log($scope.email);
        console.log($scope.password);
        $http.post('/login', $scope.data)
            .then(function(response) {
                console.log("in post");
                console.log(response.data);
                if (response.data != 'user not found') {
                    $location.path('/user');
                } else {
                    alert("user name or password is incorrect")
                }

            });
    }
}]);