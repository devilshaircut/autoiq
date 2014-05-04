// console = {log: function(asdf){} };
AngularApp.controller("summaryController", ["$scope", "httpService", "sharedDataService", function($scope, httpService, sharedDataService) {

  $scope.model = sharedDataService.get("model");

  httpService.getJsonpApiEndpoint(
    "https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId="+ $scope.model.trim + "&fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK"
  ).success( function(payload, status){
    console.log(payload)
    for( var i in payload[0].photoSrcs ){
      if( payload[0].photoSrcs[i].indexOf("1600.jpg") >=0 ){
        $scope.model.photo = "http://media.ed.edmunds-media.com" + payload[0].photoSrcs[i];
        break;
      }
    }
  });

}]);









