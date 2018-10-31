app.controller("studentsCtrl",["$scope","$uibModal","userService","$rootScope",function($scope,$uibModal,userService,$rootScope){

  
    //console.log("inside students controller");
    $scope.displayData=[];
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

   $scope.$on("evntName",function(event,data){
     $scope.displayData=$scope.getStudent();
     console.log(displayData);
   });
  

}])
