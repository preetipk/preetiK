app.controller("companyController", ['$scope', '$http', function($scope, $http) {

    $scope.addCompany = function() {
        console.log("adding company");
        $scope.data = { "companyInfo": { "userInfo": {} } }
        $scope.data.companyName = $scope.companyName;
        $scope.data.companyInfo.Fax = $scope.Fax;
        $scope.data.companyInfo.RegistartionNo = $scope.RegistartionNo;
        $scope.data.companyInfo.userInfo.userEmail = $scope.userEmail;
        console.log("dshg=" + $scope.username);

        console.log("data=" + $scope.data);

        $http.post('/company', $scope.data)
            .then(function(response) {
                console.log(response);
                refresh();
            });
    };



    var refresh = function() {
        $http.get('/company').then(function(response) {
            console.log("I got the data I requested");
            $scope.companylist = response.data;
            //console.log($scope.userlist);
        });
    };

    refresh();

    $scope.remove = function(id) {
        console.log("id =" + id);
        $http.delete('/company/' + id).then(function(response) {
            refresh();
        });
    };

    $scope.deactivate = function(id) {
        console.log("id in login to deactivate=" + id);
        console.log("name in ctrl to update=" + $scope.companyName);

        $http.put("/companies/" + id)
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


    $scope.edit = function(id) {
        _id = id;
        console.log("id=" + _id);
        $http.get("/company/" + id)
            .then(function(response) {

                    if (response) {
                        $scope.companylist = response;
                        console.log("res-data=" + $scope.companylist);
                    }
                    $scope.companyName = response.data[0].companyName;
                    console.log("userName=" + $scope.companyName);
                    $scope.userEmail = response.data[0].companyInfo.userInfo.userEmail;
                    console.log("email=" + $scope.userEmail);
                    $scope.Fax = response.data[0].companyInfo.Fax;
                    console.log("address=" + $scope.Fax);
                    $scope.RegistartionNo = response.data[0].companyInfo.RegistartionNo;
                    console.log("password=" + $scope.RegistartionNo);
                },
                function(response) {
                    $scope.msg = "error occur";
                })
        $scope.updateCompany();
    }

    $scope.updateCompany = function(companyName, userEmail, Fax, RegistartionNo) {
        console.log("id in login to update=" + _id);
        //console.log("name in ctrl to update=" + $scope.username);
        var data = {
            "companyName": companyName,
            "companyInfo": {
                "Fax": Fax,
                "RegistartionNo": RegistartionNo,
                "userInfo": {
                    "userEmail": userEmail
                }
            },

        };

        //console.log("data in put=" + data.userInfo.username);

        $http.put("/company/" + _id, data)
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


}]);