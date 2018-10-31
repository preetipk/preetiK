
app.controller("DataCtrl",['$scope','$http', function($scope, $http) { 
    $scope.data = {};
    $scope.submitData = function()
    { 
        $scope.data.userId =  $scope.userid;
        $scope.data.title =  $scope.title;
        $scope.data.details = $scope.details;
        $http.post("https://jsonplaceholder.typicode.com/posts", $scope.data)
        .then(
        function(responseText){ 
            console.log(responseText)
        },
        function(e){}
    )
    }
   
  }]);