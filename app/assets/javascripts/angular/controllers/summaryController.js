console = { log: function(input){}}
AngularApp.controller("summaryController", ["$scope", "httpService", "sharedDataService", function($scope, httpService, sharedDataService) {

  $scope.model = sharedDataService.get("model");

  httpService.getJsonpApiEndpoint(
    "https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId="+ $scope.model.trim+"&fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK"
  ).success( getStyleLookupSuccess );

  var getStyleLookupSuccess = function(payload, status) {
    console.log(" success ");
  };

  smoothScroll.init();

}]);









