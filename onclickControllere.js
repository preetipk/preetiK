angular.module("myApp").controller("onclick",
    function($scope){
       $scope.model={title:"Our Menu"};

       $scope.model.changeMainDish = function (item){
           $scope.model.mainDish = item;
       }

    // //    $scope.rename = function (newValue){
    // //        $scope.title=newValue;
    //    };
    }
);