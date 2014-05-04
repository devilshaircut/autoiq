// console = {log: function(asdf){} };
AngularApp.controller("summaryController", ["$scope", "httpService", "sharedDataService", function($scope, httpService, sharedDataService) {

  $scope.model = sharedDataService.get("model");

  httpService.getJsonpApiEndpoint(
    "https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId="+ $scope.model.trim + "&fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK"
  ).success( function(payload, status){
    var j = 0;
    for( j = 0; j < payload.length; j++ ){
      if( payload[j].shotTypeAbbreviation == "FQ" ){
        break;
      }
    }
    for( var i in payload[j].photoSrcs ){
      if( payload[j].photoSrcs[i].indexOf("1600.jpg") >=0 ){
        $scope.model.photo = "http://media.ed.edmunds-media.com" + payload[j].photoSrcs[i];
        return;
      }
    }
    $scope.model.photo = "http://media.ed.edmunds-media.com" + payload[j].photoSrcs[0];
  });

  smoothScroll.init();










}]);









