
app.controller('postController', function($scope, $http) {
  $http({
    method : "GET",
    url : "https://jsonplaceholder.typicode.com/posts"
  }).then(function(response) {
      $scope.results = response.data;
      console.log(response.data);
    }, function (response) {
      $scope.results = response.statusText;
  });
});