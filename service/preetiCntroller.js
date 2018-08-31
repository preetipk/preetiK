app.controller("ctrl",['$scope','preetiService',function($scope,preetiService){
    $scope.displayData=[];
    $scope.submit = function(){
        console.log("in submit function");
        $scope.data={
            fName:$scope.fName,
            lName:$scope.lName
        }
        preetiService.onSubmit($scope.data);
        $scope.get();
        
    }

    $scope.get = function(){
        console.log("in get function");
        $scope.displayData=preetiService.get();
        
    }
}])