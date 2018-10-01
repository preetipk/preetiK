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

    $scope.updateCompany = function() {
        console.log("adding company");

        $scope.companyName = $scope.companyName;
        $scope.companyInfo.Fax = $scope.Fax;
        $scope.companyInfo.RegistartionNo = $scope.RegistartionNo;
        $scope.companyInfo.userInfo.userEmail = $scope.userEmail;
        console.log("dshg=" + $scope.companyName);

        console.log("data=" + $scope.data);
        $http.put('/company', $scope.data)
            .then(function(response) {
                console.log(response);
                refresh();
            });
    };
    $scope.edit = function(email, username, address, password) {
        console.log("id in ctrl to update=" + _id);
        var data = {
            "companyName": companyName,
            "companyInfo": {
                "Fax": Fax,
                "RegistartionNo": username,
                userInfo: {
                    "userEmail": userEmail
                },

            },

        };
        $http.get("/company/" + _id, data)
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

    var refresh = function() {
        $http.get('/company').then(function(response) {
            console.log("I got the data I requested");
            $scope.companylist = response.data;
            console.log($scope.companylist);
        });
    };

    refresh();

    $scope.remove = function(id) {
        console.log("id =" + id);
        $http.delete('/company/' + id).then(function(response) {
            refresh();
        });
    };
}]);