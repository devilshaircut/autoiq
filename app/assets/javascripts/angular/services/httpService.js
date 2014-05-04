AngularApp.service("httpService", ["$http", function($http) {
  return {
    getApiEndpoint: function (apiEndpoint) {
      var httpRequest = $http({ method: 'GET', url: apiEndpoint} ).
        success(function(data, status, headers, config) {
          console.log("httpService.getApiEndpoint: SUCCESS");
        }).
        error(function(data, status, headers, config) {
          console.log("httpService.getApiEndpoint: ERROR");
        });
      return httpRequest;
    }, 
    getJsonpApiEndpoint: function (apiEndpoint) {
      var httpRequest = $http.jsonp(apiEndpoint).
        success(function(data, status, headers, config) {
          // console.log( data, status, headers, config)
          // console.log("httpService.getJsonpApiEndpoint: SUCCESS");
        }).
        error(function(data, status, headers, config) {
          console.log("httpService.getJsonpApiEndpoint: ERROR");
        });
      return httpRequest;
    }
  }
}]);