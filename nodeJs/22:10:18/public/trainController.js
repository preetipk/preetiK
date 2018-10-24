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

    $scope.options = {
        minDate: Date.now(),
        minDateChange: date => {
            $scope.options2.minDate = date;
        }
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };


    $scope.confirm = function() {
        $scope.login = 1
        console.log("adding user");
        $scope.data = {}
        $scope.data.email = $scope.email;
        $scope.data.bdate = $scope.bdate;
        $scope.data.btime = $scope.btime;
        $scope.data.trainNumber = $scope.trainNumber;

        console.log("dshg=" + $scope.trainNo);

        console.log("data=" + $scope.data);

        $http.post('/trains', $scope.data)
            .then(function(response) {
                console.log("in post controller");
                if (response.data == 'Booking is not available') {
                    alert("Booking is Full");

                } else {
                    alert("are U sure... do U want confirm booking?")
                }
                refresh();
            });
    };

    $scope.booking = function(id) {
        _id = id;
        console.log("id=" + _id);
        $http.get("/trains/" + id)
            .then(function(response) {
                    if (response) {
                        $scope.trainlist = response;
                        console.log("res-data=" + $scope.trainlist);
                    }
                    $scope.trainNumber = response.data[0].trainNumber;
                    console.log("trainNumber=" + $scope.trainNumber);
                },
                function(response) {
                    $scope.msg = "error occur";
                })
        refresh();
        // $scope.bookTrain();
    }

    $scope.bookTrain = function(trainNumber) {
        console.log("id in login to update=" + _id);
        //console.log("name in ctrl to update=" + $scope.username);
        var data = {
            "trainNumber": trainNumber,
        };

        var trainNumber = $scope.trainNumber;
        console.log("trainNumber=" + trainNumber);

        $http.put("/trains/" + _id, data)
            .then(function(response) {
                    if (response !== null) {
                        console.log("resp=" + response);
                        $scope.msg = "data posted ...."
                        refresh();
                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
        $scope.isDisabled = false;

        $scope.booking = function() {
            $scope.isDisabled = !$scope.isDisabled;
        }
    }

    $scope.logout = function() {
        console.log("in user logout");
        $http.get("/logout")
            .then(function(response) {
                    console.log("user logout ");
                    console.log(response);
                    userModel.dologout();
                    $location.path('/');
                },
                function(response) {
                    $scope.status = response.status;
                });
    }

}]);