app.controller("studentsCtrl",["$scope","$uibModal","userService",function($scope,$uibModal,userService){

  
    //console.log("inside students controller");

     $scope.open=function(){
     
     var object=$uibModal.open({
  
       ariaLabelledBy: 'modal-dialog',
       ariaDescribedBy: 'modal-body',
       templateUrl: 'preeti.html',
       controller: 'studentCtrl',
       backdrop: true
  
  
  
     });
     
     return object;
  
   }
  
      function getController(studentCtrl){
          return function($scope){
              $scope.$on("message",function(e,opt){
                  console.log("controller" + studentCtrl+ "received message" + opt.message);
              })

              allScopes.studentsCtrl=$scope;
          }
      }

     //$scope.studentInfo = sharedDataServices;

}])
