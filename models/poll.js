const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var userModel = require('../models/user');
// schema for user created polls
var pollSchema = mongoose.Schema({
    '_id': String,
    'pollQuestion': String,
    'pollData': {
        'pollChoices': [String],
        'pollResponses': [Number]
    },
    'totalResponses': Number,
    'createdBy': String,
    'creationDate': Date,
    'ipThatVoted': [String]
});

//create a new poll
pollSchema.methods.newPoll = function(question, choices, creator) {
    var tempID = new ObjectID();
    var numAnswers =[];
    for(var i=0; i < choices.length;i++){ // empty array for responses
      numAnswers.push(0);
    }
    var newPoll = new pollModel({
        '_id': tempID,
        'pollQuestion': question,
        'pollData': {
            'pollChoices': choices,
            'pollResponses': numAnswers
        },
        'totalResponses': 0,
        'createdBy': creator,
        'creationDate': new Date()
    });

    newPoll.save(function(err) { // save newly created poll
        if (err) {
            return console.error(err);
        } else {
            return tempID;
        }

    }).then(function() {
        userModel.findOneAndUpdate({ // find user doc
            githubDisplay: creator
        }, {
            $push: {
                'createdPolls': tempID //add newly create poll to the user doc
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        }, function(err, doc) {
            
        })
    });

    return tempID;
}

var pollModel = mongoose.model('poll', pollSchema, 'polls');
module.exports = pollModel;
