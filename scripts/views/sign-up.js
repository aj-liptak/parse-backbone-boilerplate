//Filename: sign-up.js

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'parse',
  'scripts/animate',
  'text!templates/sign-up.html'
], function($, _, Parse, Animate, SignUpTemplate){
  // Above we have passed in jQuery, Underscore and Parse
  // They will not be accessible in the global scope
  var signUpView = Parse.View.extend({

    el: $('#container'),

    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( SignUpTemplate, data );
      // Append our compiled template to this Views "el"
      //$(this.$el).empty().append( compiledTemplate );
      Animate.slideIn(this.el, compiledTemplate);
    },

    events: {
      'click input[data-name="submit"]': "registerUser",
      'click input[data-name="go-to-login"]': "goToLogin"
    },

    registerUser: function (e){
      e.stopPropagation();
      var user = new Parse.User();
      user.set('username', $('#username').val());
      user.set('password', $('#password').val());
      user.set('email', $('#email').val());

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    goToLogin: function (e) {
      e.stopPropagation();
      Parse.history.navigate('login', true);
    }
  });

  //return signUpView
  return signUpView;
});
