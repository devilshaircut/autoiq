AngularApp.controller("sellController", ["$scope", "httpService", "sharedDataService", function($scope, httpService, sharedDataService) {

  smoothScroll.init();

  $scope.model = {};

  $scope.$watch('model', function(newValue, oldValue) { sharedDataService.set( "model", newValue ); }, true);
  
  $scope.$watch('model.vin_number', function(newValue, oldValue) {
    if( typeof newValue != "undefined" && newValue.length == 17 ){
      httpService.getJsonpApiEndpoint("https://api.edmunds.com/api/vehicle/v2/vins/"+newValue+"?fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK").success(getVinLookupSuccess);
    }
  }, true);

  $scope.$watch("model.zip", function(newValue, oldValue){
    if( $scope.model.trim && $scope.model.zip && $scope.model.mileage && $scope.model.zip.length == 5 ){
      httpService.getJsonpApiEndpoint(
        "https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid="+$scope.model.trim+"&zip="+ $scope.model.zip + "&mileage="+$scope.model.mileage + "&condition=Outstanding&fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK"
      ).success(function( payload, status){
        $scope.model.price = payload.tmv.totalWithOptions.usedPrivateParty;
      });  
    }
    
  });

  var getVinLookupSuccess = function(payload, status) {
    if( typeof $scope.model.trim_options == "undefined" ) $scope.model.trim_options = [];

    for( var i in payload.years[0].styles ){
      if( i == 0 ){
        $scope.model.trim = payload.years[0].styles[i].id;
      }
      $scope.model.trim_options.push({ name: payload.years[0].styles[i].name, id: payload.years[0].styles[i].id });
      $scope.model.car = "" + payload.years[0].year+ " " + payload.make.name + " " + payload.model.name
    }
  };

  smoothScroll.init();

}]);









