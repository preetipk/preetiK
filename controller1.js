angular.module("myapp").controller("personalInfo",[$scope,function($scope){
     $scope.personalInfo={
         name        : Preeti,
         dateOfBirth : 01/11/1994,
         location    : Pune
     }
}]);
    console.log($scope.personalInfo);