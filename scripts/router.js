// Filename: router.js
define([
  'jquery',
  'underscore',
  'parse',
  'scripts/views/login',
  'scripts/views/sign-up',
  'scripts/views/404'
], function($, _, Parse, LoginView, SignUpView, ErrorView) {
  var AppRouter = Parse.Router.extend({
    routes: {
      // Define some URL routes
      'login': 'showLogin',
      'signUp': 'showSignUp',
      '*actions': 'errorPage'
    },

    showLogin: function() {
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var loginView = new LoginView();
      loginView.render();
    },

    showSignUp: function() {
      var signUpView = new SignUpView();
      signUpView.render();
    },

    errorPage: function() {
      var errorView = new ErrorView();
      errorView.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    Parse.history.start({pushState: true});
    Parse.history.navigate('login', true);
  };

  return {
    initialize: initialize
  };
});
