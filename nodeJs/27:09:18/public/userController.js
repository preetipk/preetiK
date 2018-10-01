app.controller("userController", ['$scope', '$http', function($scope, $http) {

    $scope.adduser = function() {
        console.log("adding user");
        $scope.data = { "userInfo": {} }
        $scope.data.email = $scope.email;
        $scope.data.userInfo.username = $scope.username;
        $scope.data.passwoprd = $scope.password;
        $scope.data.userInfo.address = $scope.address;

        console.log("dshg=" + $scope.username);

        console.log("data=" + $scope.data);

        $http.post('/user', $scope.data)
            .then(function(response) {
                console.log(response);
                refresh();
            });
    };

    // $scope.updateUser = function(email, username, address, password) {
    //     console.log("id in ctrl to update=" + _id);
    //     var data = {
    //         "email": email,
    //         "userInfo": {
    //             "address": address,
    //             "username": username,
    //         },
    //         "password": password
    //     };

    //     $http.put("/user/" + _id, data)
    //         .then(function(response) {
    //                 if (response) {
    //                     $scope.msg = "data posted ...."
    //                     refresh();
    //                 }
    //             },
    //             function(response) {
    //                 $scope.msg = "error occur";
    //             })
    // }
    $scope.edit = function(id) {
        _id = id;
        $http.get("/user/" + _id)
            .then(function(response) {
                    if (response) {
                        //var self = this;
                        $scope.user = response;
                        console.log("response=" + response.data.user.userInfo);
                        console.log("data=" + response.data[0]);
                        $scope.self.username = response.data.userInfo.username;
                        console.log("user name=" + response.data.userInfo);
                        $scope.email = response.data.email;
                        console.log("email=" + response.data.email);
                        $scope.password = response.data.password;
                        $scope.address = response.data.userInfo.address;

                        console.log("data edit  ....");
                        //  $scope.update(id);
                        //console.log("add=" + $scope.address);

                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
            // $scope.updateUser();
    }

    var refresh = function() {
        $http.get('/user').then(function(response) {
            console.log("I got the data I requested");
            $scope.userlist = response.data;
            //console.log($scope.userlist);
        });
    };

    refresh();

    $scope.remove = function(id) {
        console.log("id =" + id);
        $http.delete('/user/' + id).then(function(response) {
            refresh();
        });
    };


}]);