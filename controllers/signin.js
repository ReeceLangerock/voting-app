//setup ========================================================================
var GithubStrategy = require('passport-github').Strategy;
var express = require('express');
var passport = require('passport');
var userModel = require('../models/user');
var router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// github login strategy
passport.use(new GithubStrategy({
    clientID: "9b1d8df7cfc994b8d0b8",
    clientSecret: "a384c12cb8b87b52ad88e82a6edd793016fe6800",
    callbackURL: "https://voting-app-srl.herokuapp.com/signin/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  userModel.findOne({
      'githubID': user.id // query db for user based of githubID
  }, function(err, obj) {
      if (err) {
          console.log(err);
      } else if (obj) {
          return true; // if username already taken return true
      } else {
        // if user hasn't signed in before then create new user
          userModel.schema.methods.newUser(user.displayName, user.id);
      }
  });
  done(null, user);
});


// get call to /signin
router.get('/', passport.authenticate('github'));

// GitHub will call this URL
router.get('/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
