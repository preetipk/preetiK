
app.controller("usersController",['$scope','$http','userService', function($scope,$http,userService) { 
  
   $scope.get = function(){
    userService.getUsers()
    .then(

      function(response){
        
          $scope.users = response.data.data; 
          //console.log($scope.users);
          $scope.displayTable = true;
        },

      function(error){ 
          $scope.displayTable = false;
          $scope.error = true;
      })
    }

    
   $scope.delete = function(value) {
    if (confirm('Are you sure you want to delete this?')) {
      $scope.index = $scope.users.indexOf($scope.users[value]);
      $scope.users.splice($scope.index, 1); 
    
    }
  }
    
  }]);
 
  

  
  
  
  