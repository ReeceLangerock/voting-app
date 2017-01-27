const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var userSchema = mongoose.Schema({
  '_id': String,
  'githubDisplay': String,
  'githubID': String,
  'createdPolls': [String]
});


userSchema.methods.newUser = function(gitDisplay, gitID){
  var newUser = new userModel({
    '_id': new ObjectID(),
    'githubDisplay': gitDisplay,
    'githubID': gitID,
    createdPolls: []
  });

  newUser.save(function(err) {
    if(err) return console.error(err);
  })
}
var userModel = mongoose.model('user', userSchema, 'users');
module.exports = userModel;
