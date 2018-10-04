app.controller("companyController", ['$scope', '$http', function($scope, $http) {

    //get data
    var refresh = function() {
        $http.get('/company').then(function(response) {
            console.log("I got the data I requested");
            $scope.companylist = response.data;
            //console.log($scope.userlist);
        });
    };
    refresh();

    //add new company
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
                console.log("in post");
                console.log("res=" + response);
                if (response.data === "Company is  already exist") {
                    alert("email is already exist");
                }
                refresh();
            });
    };
    //validations to submit form
    $scope.submitForm = function() {
        $scope.submitted = true;

        if ($scope.userForm.$valid) {
            console.log("in validate function");
            alert("Form is valid!");
        } else {
            alert("Please correct errors!");
        }
    };

    //remove data
    $scope.remove = function(id) {
        console.log("id =" + id);
        $http.delete('/company/' + id).then(function(response) {
            refresh();
        });
    };

    //status deactivate
    $scope.deactivate = function(id) {
        console.log("id in login to deactivate=" + id);
        console.log("name in ctrl to update=" + $scope.companyName);

        $http.put("/companies/" + id)
            .then(function(response) {
                    if (response) {
                        $scope.msg = "data posted ...."
                        refresh();
                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
    }

    //status activated
    $scope.activated = function(id) {
        console.log("id in login to deactivate=" + id);
        console.log("name in ctrl to update=" + $scope.companyName);

        $http.put("/companiess/" + id)
            .then(function(response) {
                    if (response) {
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
                        $scope.company = response;
                        $scope.companyName = response.data[0].companyName;
                        $scope.userEmail = response.data[0].companyInfo.userInfo.userEmail;
                        $scope.Fax = response.data[0].companyInfo.Fax;
                        $scope.RegistartionNo = response.data[0].companyInfo.RegistartionNo;
                    }
                },
                function(response) {
                    $scope.msg = "error occur";
                })
    }

    $scope.updateCompany = function(companyName, userEmail, Fax, RegistartionNo) {
        console.log("id in login to update=" + _id);

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