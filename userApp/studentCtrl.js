app.controller("studentCtrl",['$scope',"userService",function($scope,userService){
  
  $scope.studentInfo={};

  $scope.classList = [
    { classId: 1, Name: '7th' },
    { classId: 2, Name: '8th' },
    { classId: 3, Name: '9th' },
    { classId: 4, Name: '10th' }
    ];

    $scope.gradeList = [
      { gradeId: 1, Name: 'A' },
      { gradeId: 2, Name: 'A+' },
      { gradeId: 3, Name: 'B' },
      { gradeId: 4, Name: 'B+' },
      { gradeId: 4, Name: 'C' },
      { gradeId: 4, Name: 'C+' }
      ];

      $scope.message="gfhdsgfh"

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.submitForm = function () {
 
    // Set the 'submitted' flag to true
    $scope.submitted = true;
    
    if ($scope.userForm.$valid) {
    alert("Form is valid!");
    }
    else {
    alert("Please correct errors!");
    }
    };
   
    $scope.userForm = {}
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    
        $scope.studentInfo.fName = $scope.fName;
        $scope.studentInfo.lName = $scope.lName;
        $scope.studentInfo.class = $scope.class;
        $scope.studentInfo.grade = $scope.grade;

        console.log($scope.studentInfo);
    //$scope.studentInfo = sharedDataServices;
}]);