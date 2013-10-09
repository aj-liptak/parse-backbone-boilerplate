// Filename: views/login
define([
  'jquery',
  'underscore',
  'parse',
  'scripts/router',
  'scripts/animate',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/login.html'
], function($, _, Parse, Router, Animate, LoginTemplate){
  var LoginView = Parse.View.extend({

    el: $('#container'),

    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( LoginTemplate, data );
      // Append our compiled template to this Views "el"
      //this.$el.append( compiledTemplate );
      Animate.slideIn(this.el, compiledTemplate);
    },

    events: {
      'click input[data-name="login"]': "loginUser",
      'click input[data-name="sign-up"]': "goToSignUp"
    },

    loginUser: function (e) {
      e.stopPropagation();
      var user = new Parse.User();
      user.setUsername($('#username').val(), {});
      user.setPassword($('#password').val(), {});

      user.logIn({
        success: function(user) {
          console.log(user);
        },
        error: function(user, error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    goToSignUp: function (e) {
      e.stopPropagation();
      Parse.history.navigate('signUp', true);
    }
  });
  // Our module now returns our view
  return LoginView;
});
