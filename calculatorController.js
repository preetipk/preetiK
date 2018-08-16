angular.module("myApp").controller("myController",function($scope){
       $scope.output=null;
        $scope.result = function() {
            if ($scope.operator == 'add') {
                $scope.output = $scope.firstnumber + $scope.secondnumber;
            }
            if ($scope.operator == 'subtract') {
                $scope.output = $scope.firstnumber - $scope.secondnumber;
            }
            if ($scope.operator == 'multiply') {
                $scope.output = $scope.firstnumber * $scope.secondnumber;
            }
            if ($scope.operator == 'divide') {
                $scope.output = $scope.firstnumber / $scope.secondnumber;
            }
        };
    });




    
