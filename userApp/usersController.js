
app.controller("usersController",['$scope','$http','$routeParams','userService', function($scope,$http,$routeParams,userService) { 
  
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

       $scope.id = $routeParams.id;
      $scope. deleteU= function(value) {
      if (confirm('Are you sure you want to delete this?')) {
      $scope.index = $scope.users.indexOf($scope.users[value]);
      $scope.users.splice($scope.index, 1); 
    
    }
  }

  $scope.delete  = function(){ 
    userService.deleteUser($scope.id)
     .then(
         function(response){
         $scope.ngShow = true; 
         $scope.user = $scope.deleteU(); 
        },

      function(error){ 
        $scope.ngShow = false; 
        $scope.ngShowData = true;
        })
     
      }
    }

   
  }]);
 
  

  
  
  
  