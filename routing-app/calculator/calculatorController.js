app.controller("calculatorController",['$scope','$routeParams',function($scope,$routeParams){

    $scope.firstnumber = $routeParams.firstnumber;
    $scope.secondnumber = $routeParams.secondnumber;
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
 }]);

