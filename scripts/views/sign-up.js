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

    registerUser: function (e) {
      e.stopPropagation();
      var user = new Parse.User();
      var username = $('#username').val();
      var password = $('#password').val();
      var email = $('#email').val();

      this.validateInputs(username, password, email);

      if(username.length > 0 && password.length > 0 && email.length > 0) {

        user.setUsername(username, {});
        user.setPassword(password, {});
        user.setEmail(email, {});

        user.signUp(null, {
          success: function(user) {
            console.log(user);
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            $('.sign-up-error').show();
          }
        });

      }
    },

    validateInputs: function (username, password, email) {

      username.length < 1 ? $('.username-error').show() : $('.username-error').hide();

      password.length < 1 ? $('.password-error').show() : $('.password-error').hide();

      email.length < 1 ?  $('.email-error').show() :  $('.email-error').hide();

    },

    goToLogin: function (e) {
      e.stopPropagation();
      this.$el.unbind('click');
      Parse.history.navigate('login', true);
    }
  });

  //return signUpView
  return signUpView;
});
