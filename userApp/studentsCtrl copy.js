app.controller('studentsCtrl', ['$scope', function (scope) {
    scope.studentInfo = [
        {firstName: 'Preeti', lastName: 'Kulkarni', birthDate: '01-11-1994', class: "7th"},
        {firstName: 'Yogita', lastName: 'Thakur', birthDate: '11-04-1994', class: "6th"},
        {firstName: 'Lalit', lastName: 'Saindane', birthDate: '13-12-1994', class: "5th"}
    ];
}]);