app.controller("bookingController", ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {

    var refresh = function() {
        $http.get('/bookingDetails')
            .then(function(response) {
                console.log("I got the data I requested");
                $scope.trainlist = response.data;
                //console.log($scope.userlist);
            });
    };

    refresh();

}]);