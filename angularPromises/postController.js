
app.controller('getCallController', function($scope, $http) {
  $http({
    method : "GET",
    url : "https://jsonplaceholder.typicode.com/post123"
  }).then(function(response) {
      $scope.results = response.data;
      console.log(response.data);
    }, function (response) {
      $scope.results = response.statusText;
  });
});