AngularApp.controller("catalogController", ["$scope", "httpService", "$timeout", function($scope, httpService, $timeout) {

  // $scope.model = {};

  // var apiEndpoint = '/path/to/api/file.json';

  // // This is the callback function that executes if the HTTP requests returns successfully.
  // var getModelSuccess = function(payload, status) {
  //   $scope.model = payload.data; // Remove .data if API is not formatted to store data in a data property.
  // };

  // // This is the callback function that executes if the HTTP requests returns unsuccessfully.
  // var getModelFailure = function(payload, status) {};

  // // Initiate the HTTP request.
  // httpService.getApiEndpoint(apiEndpoint).success(getModelSuccess);

  $scope.tableView = false;

  $scope.pageTitle = "Find A Car".split("");
  console.log($scope.pageTitle);

  $scope.pageReady = false;
  $scope.bounceReady = false;
  $scope.animateIn = function() {
    $scope.pageReady = true;
    $scope.bounceReady = true;
    // $timeout( function() { $scope.bounceReady == false }, 250);
  };
  $timeout($scope.animateIn, 250);

}]);









