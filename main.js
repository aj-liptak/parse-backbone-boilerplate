requirejs.config({
  paths: {
    "jquery": "scripts/libs/jquery-1.8.3",
    "underscore": "scripts/libs/underscore-amd",
    "parse": "scripts/libs/parse"
  },
  shim: {
    "parse": {
      deps: ["jquery", "underscore"],
      exports: "Parse"
    }
  }
});

require([

  // Load our app module and pass it to our definition function
  'app'
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();

});



