app.controller("loginController", ['$scope', '$http', '$location', 'userModel', '$cookies',

    function($scope, $http, $location, userModel, $cookies) {
        $scope.submit = function submit() {
            $scope.data = {};
            $scope.data.email = $scope.email;
            $scope.data.password = $scope.password;
            console.log($scope.email);
            console.log($scope.password);

            //userModel.stack();

            $http.post('/', $scope.data)
                .then(function(response) {
                    console.log("in post");
                    console.log("response.data=" + response.data);

                    if (response.data === 'User exist') {
                        $cookies.put('abc', response);
                        $location.path('/user');
                    } else {
                        alert("user name or password is incorrect");
                    }

                });
        }
    }
]);