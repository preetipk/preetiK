app.controller("trainController", ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {

    var refresh = function() {
        $http.get('/trains')
            .then(function(response) {
                console.log("I got the data I requested");
                $scope.trainlist = response.data;
                //console.log($scope.userlist);
            });
    };

    refresh();



    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };
    $scope.adduser = function() {
        $scope.login = 1
        console.log("adding user");
        $scope.data = {}
        $scope.data.userEmail = $scope.userEmail;
        $scope.data.noOfSeats = $scope.noOfSeats;
        $scope.data.arrivalTime = $scope.arrivalTime;
        console.log("passwors" + $scope.password);
        $scope.data.departureTime = $scope.departureTime;

        console.log("dshg=" + $scope.trainNo);

        console.log("data=" + $scope.data);

        $http.post('/trains', $scope.data)
            .then(function(response) {
                console.log("in post controller");

                if (response.data == 'User is  already exist') {
                    alert("email is already exist");
                }
                refresh();
            });


    };

    // $scope.edit = function(id) {
    //     _id = id;
    //     console.log("id=" + _id);
    //     $http.get("/user/" + id)
    //         .then(function(response) {

    //                 if (response) {
    //                     $scope.userlist = response;
    //                     console.log("res-data=" + $scope.userlist);
    //                 }
    //                 $scope.email = response.data[0].email;
    //                 console.log("email=" + $scope.email);

    //                 $scope.username = response.data[0].userInfo.username;
    //                 console.log("userName=" + $scope.username);

    //                 $scope.address = response.data[0].userInfo.address;
    //                 console.log("address=" + $scope.address);

    //                 $scope.password = response.data[0].password;
    //                 console.log("password=" + $scope.password);
    //             },
    //             function(response) {
    //                 $scope.msg = "error occur";
    //             })
    //     $scope.updateUser();
    // }

    // $scope.updateUser = function(email, username, address, password) {
    //     console.log("id in login to update=" + _id);
    //     //console.log("name in ctrl to update=" + $scope.username);
    //     var data = {
    //         "email": email,
    //         "userInfo": {
    //             "username": username,
    //             "address": address,
    //         },
    //         "password": password
    //     };

    //     var emai = $scope.email;
    //     console.log("email=" + emai);
    //     var Email = data.email;
    //     console.log("email from database=" + Email);

    //     $http.put("/user/" + _id, data)
    //         .then(function(response) {
    //                 if (response !== null) {
    //                     if (data.email != Email) {
    //                         alert("email should not be change");
    //                     } else {
    //                         console.log("resp=" + response);
    //                         $scope.msg = "data posted ...."
    //                         refresh();
    //                     }
    //                 }
    //             },
    //             function(response) {
    //                 $scope.msg = "error occur";
    //             })


    //     $scope.isDisabled = false;

    //     $scope.edit = function() {
    //         $scope.isDisabled = !$scope.isDisabled;
    //     }
    // }




    // $scope.logout = function() {
    //     console.log("in user logout");
    //     $http.get("/logout")
    //         .then(function(response) {
    //                 console.log("user logout ");
    //                 console.log(response);
    //                 userModel.dologout();
    //                 $location.path('/');
    //             },
    //             function(response) {
    //                 $scope.status = response.status;
    //             });
    // }





}]);