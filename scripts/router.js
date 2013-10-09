// Filename: router.js
define([
  'jquery',
  'underscore',
  'parse',
  'scripts/views/login',
  'scripts/views/sign-up'
], function($, _, Parse, LoginView, SignUpView) {
  var AppRouter = Parse.Router.extend({
    routes: {
      // Define some URL routes
      'login': 'showLogin',
      'signUp': 'showSignUp',
      '': 'showLogin'

      // Default
      //'*actions': 'showLogin'
    },

    showLogin: function() {
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var loginView = new LoginView();
      loginView.render();
    },

    showSignUp: function () {
      var signUpView = new SignUpView();
      signUpView.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    Parse.history.start({pushState: true}); //Starts Parse.History which allows user to navigate using back and forward buttons
    Parse.history.navigate('login', true);
  };

  return {
    initialize: initialize
  };
});
