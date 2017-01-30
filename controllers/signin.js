var GithubStrategy = require('passport-github').Strategy;
var express = require('express');
var passport = require('passport');
var userModel = require('../models/user');
var router = express.Router();
router.use(passport.initialize());
router.use(passport.session());



passport.use(new GithubStrategy({
    clientID: "9b1d8df7cfc994b8d0b8",
    clientSecret: "a384c12cb8b87b52ad88e82a6edd793016fe6800",
    callbackURL: "http://localhost:3000/signin/callback"
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
      'githubID': user.id
  }, function(err, obj) {
      if (err) {
          console.log(err);
      } else if (obj) {
          console.log("deserialize;"+true); // if username already taken return true
      } else {
          userModel.schema.methods.newUser(user.displayName, user.id);
      }
  });

  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});



router.get('/', passport.authenticate('github'));

// GitHub will call this URL
router.get('/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
