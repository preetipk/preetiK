
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

    $scope.delete = function(index) {  
      var retval = userService.deleteUser(user.Id)
      .success(function(msg) {  
          $scope.user.splice(index, 1);  
          alert('User has been deleted successfully.');  
      })
      .error(function() {  
          alert('Oops! something went wrong.');  
      });  

   }

   $scope.delete= function(id) {
    if (confirm('Are you sure you want to delete this?')) {
    $http.delete("users.html"+id)
    .then(function(response){
    console.log(response);
    });
    }
    
    }
  
    
  }]);
 
  

  
  
  
  