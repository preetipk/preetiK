app.controller("studentCtrl",['$scope',"userService","$rootScope",function($scope,userService,$rootScope){
  
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



// $scope.$on('eventName', function (event, args) {

//     $rootscope.students = args.studentInfo;
//     console.log("hello");
    
//     })
   $scope.save = function(){

        $scope.studentInfo.fName = $scope.fName;
        $scope.studentInfo.lName = $scope.lName;
        $scope.studentInfo.class = $scope.class;
        $scope.studentInfo.grade = $scope.grade;
        console.log($scope.studentInfo);
  
        userService.setStudent($scope.studentInfo);
    }
  }]);