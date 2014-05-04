AngularApp.controller("sellController", ["$scope", "httpService", "sharedDataService", "$timeout", function($scope, httpService, sharedDataService, $timeout) {

  smoothScroll.init();

  $scope.model = {};

  $scope.$watch('model', function(newValue, oldValue) { sharedDataService.set( "model", newValue ); }, true);
  
  $scope.$watch('model.vin_number', function(newValue, oldValue) {
    if( typeof newValue != "undefined" && newValue.length == 17 ){
      httpService.getJsonpApiEndpoint("https://api.edmunds.com/api/vehicle/v2/vins/"+newValue+"?fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK").success(getVinLookupSuccess);
    }
  }, true);

  $scope.$watch("model.mileage", function(newValue, oldValue){
    if( typeof newValue == "string" ) $scope.model.mileage = parseInt( newValue.replace(",", "").replace(".", "") );
  });

  $scope.$watch("model.zip", function(newValue, oldValue){
    if( $scope.model.trim && $scope.model.zip && $scope.model.mileage && $scope.model.zip.length == 5 ){
      httpService.getJsonpApiEndpoint(
        "https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid="+$scope.model.trim+"&zip="+ $scope.model.zip + "&mileage="+$scope.model.mileage + "&condition=Outstanding&fmt=json&api_key=6f6hhxs549tjfubcfqqxgnyz&callback=JSON_CALLBACK"
      ).success(function( payload, status){
        $scope.model.price = payload.tmv.totalWithOptions.usedPrivateParty;
      });  
    }
    
  });

  // $timeout( function() { $("ul#wrapper > li").addClass("wrapper-here"); }, 2000 );

    $(window).scroll(function() {
      if ( $("#ns-section-condition").position().top < $(window).scrollTop() ) {
        $("ul#wrapper > li").addClass("wrapper-here");
        $("ul#wrapper > li").addClass("wrapper-here");
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

  $scope.letterDown = false;
  $scope.animateLetter = function() {
    $scope.letterDown = true;
    $timeout( function() { $scope.letterDown = false; }, 500);
  };

  $scope.letterRight = false;
  $scope.animateVin = function() {
    $scope.letterRight = true;
    $timeout( function() { $scope.letterRight = false; }, 500);
  };

  $scope.seatbeltLeft = false;
  $scope.seatbeltRight = false;
  $scope.animateSeatbelt = function() {
    $scope.seatbeltRight = true;
    $scope.seatbeltLeft = true;
  };

  $scope.wrapperHere = false;
  $scope.moveWrapper = function() {
    $scope.wrapperHere = true;
  };




  smoothScroll.init();


}]);









