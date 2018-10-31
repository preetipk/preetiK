angular.module("myApp").controller("onclick",
    function($scope){

        $scope.prise={
            "Cheese Pizza"      : "$13.99",
            "Pepperoni Pizza"   : "$15",
            "Margherita Pizza"  :"$16",
            "BBq Chicken Pizza" :"$19",
            "Combo Pizza"       :"$20"
        };

       $scope.model={title:"Our Menu"};
       $scope.count = 0;
       $scope.$watch('model.mainDish', function (newValue, oldvalue) {
           console.log("new value="+newValue);
           console.log("old value="+oldvalue);
           
           $scope.count++;
           console.log("count="+$scope.count);
        if (newValue === 'BBQ Chicken Pizza') {
            
           
            alert('You have selected the BBQ Chicken Pizza!');
        }
    });
        

       $scope.model.changeMainDish = function (item){
           $scope.model.mainDish = item;
       }
       console.log($scope.model.mainDish);

    // //    $scope.rename = function (newValue){
    // //        $scope.title=newValue;
    //    };
    }
);