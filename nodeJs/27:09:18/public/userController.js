app.controller("userController", ['$scope', '$http', function($scope, $http) {

    var refresh = function() {
        $http.get('/user').then(function(response) {
            console.log("I got the data I requested");
            $scope.userlist = response.data;
            //console.log($scope.userlist);
        });
    };

    refresh();

    $scope.submitForm = function() {

        // Set the 'submitted' flag to true
        $scope.submitted = true;

        if ($scope.userForm.$valid) {
            console.log("in validate function");
            alert("Form is valid!");
        } else {
            alert("Please correct errors!");
        }
    };

    $scope.adduser = function() {
        console.log("adding user");
        $scope.data = { "userInfo": {} }
        $scope.data.email = $scope.email;
        $scope.data.userInfo.username = $scope.username;
        $scope.data.password = $scope.password;
        console.log("passwors" + $scope.password);
        $scope.data.userInfo.address = $scope.address;

        console.log("dshg=" + $scope.username);

        console.log("data=" + $scope.data);

        $http.post('/user', $scope.data)
            .then(function(response) {
                console.log("in post controller");
                if (response.data == 'User is  already exist') {
                    alert("email is already exist");
                }
                refresh();
            });


    };

    $scope.edit = function(id) {
        _id = id;
        console.log("id=" + _id);
        $http.get("/user/" + id)
            .then(function(response) {

                    if (response) {
                        $scope.userlist = response;
                        console.log("res-data=" + $scope.userlist);
                    }
                    $scope.email = response.data[0].email;
                    console.log("email=" + $scope.email);

                    $scope.username = response.data[0].userInfo.username;
                    console.log("userName=" + $scope.username);

                    $scope.address = response.data[0].userInfo.address;
                    console.log("address=" + $scope.address);

                    $scope.password = response.data[0].password;
                    console.log("password=" + $scope.password);
                },
                function(response) {
                    $scope.msg = "error occur";
                })
        $scope.updateUser();
    }

    $scope.updateUser = function(email, username, address, password) {
        console.log("id in login to update=" + _id);
        //console.log("name in ctrl to update=" + $scope.username);
        var data = {
            "email": email,
            "userInfo": {
                "username": username,
                "address": address,
            },
            "password": password
        };

        //console.log("data in put=" + data.userInfo.username);

        $http.put("/user/" + _id, data)
            .then(function(response) {
                    if (response !== null) {
                        console.log("resp" + response);
                        $scope.msg = "data posted ...."
                        refresh();
                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
    }





    $scope.deactivate = function(id) {
        console.log("id in login to deactivate=" + id);
        //console.log("name in ctrl to update=" + $scope.firstName);

        $http.put("/users/" + id)
            .then(function(response) {
                    if (response) {
                        // console.log("resp" + response);
                        $scope.msg = "data posted ...."
                        refresh();
                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
    }

    $scope.activated = function(id) {
        console.log("id in login to activate=" + id);
        //console.log("name in ctrl to update=" + $scope.firstName);

        $http.put("/userss/" + id)
            .then(function(response) {
                    if (response) {
                        // console.log("resp" + response);
                        $scope.msg = "data posted ...."
                        refresh();
                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
    }


    $scope.remove = function(id) {
        console.log("id =" + id);
        $http.delete('/user/' + id).then(function(response) {
            refresh();
        });
    };


}]);