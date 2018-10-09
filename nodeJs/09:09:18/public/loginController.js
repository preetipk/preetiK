app.controller("loginController", ['$scope', '$http', '$location', 'authFact', function($scope, $http, $location, authFact) {



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


                if (response.data === 'User exist') {
                    console.log("authResponse=" + response.authResponse);
                    if (response.authResponse) {
                        console.log("welcome");
                        var accessTocken = getAuthResponse().accessTocken;
                        console.log(accessTocken);
                        authFact.setAccessTocken(accessTocken);

                        $location.path("/user");

                    } else {
                        alert('User canceled login');
                    }

                    // $location.path('/user');
                } else {
                    alert("user name or password is incorrect");
                }

                // if (response.authResponse) {
                //     var accessTocken = getAuthResponse().accessTocken;
                //     console.log(accessTocken);
                //     authFact.setAccessTocken(accessTocken);

                //     $location.path("/user");


                // } else {
                //     console.log('User canceled login');
                // }


            });
    }
}]);