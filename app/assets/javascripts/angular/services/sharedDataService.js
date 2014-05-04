AngularApp.service("sharedDataService", function() {
  return {
    get: function(name){
      return JSON.parse( localStorage.getItem(name) );
    },
    set: function(name, value){
      localStorage.setItem( name, JSON.stringify(value) );
    }
  }
});