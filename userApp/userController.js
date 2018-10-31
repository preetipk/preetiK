app.controller("userController", ['$scope', '$http', '$routeParams', '$location', 'userService', function($scope, $http, $routeParams, $location, userService) {

    $scope.data = {};
    $scope.id = $routeParams.id;
    console.log($scope.id);

    $scope.myUrl = $location.absUrl();
    console.log($scope.myUrl);

    $scope.singleUser = function() {
        userService.getUser($scope.id)
            .then(
                function(response) {
                    $scope.ngShow = true;
                    $scope.user = response.data.data;
                },

                function(error) {
                    $scope.ngShow = false;
                    $scope.ngShowData = true;
                })

    }
    $scope.update = function() {

        $scope.data.id = $scope.id;
        $scope.data.first_name = $scope.firstName;
        $scope.data.last_name = $scope.lastName;
        $scope.data.avatar = $scope.avatar;


        userService.updateUser($scope.id, $scope.data)
            .then(

                function(response) {
                    $scope.click = true;
                    $scope.success = true;
                },

                function(error) {
                    $scope.success = false;
                    $scope.error = true;
                })
    }
}]);