app.controller('studentCtrl', function () {
  

  

  $ctrl.open = function () {
    
    var modalInstance = $uibModal.open({
      
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModal.html',
      controller: 'studentCtrl'
      
      
      
      
    });

    

  
  };

  
 
});



  

  

