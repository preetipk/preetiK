app.controller("userController", ['$scope', "userService", function($scope, userService) {
    $scope.Username;
    $scope.submitForm = function() {

        // Set the 'submitted' flag to true
        $scope.submitted = true;

        if ($scope.userForm.$valid) {
            alert("Form is valid!");
        } else {
            alert("Please correct errors!");
        }
    };

}]);