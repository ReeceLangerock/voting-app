const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var userModel = require('../models/user');
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


pollSchema.methods.newPoll = function(question, choices, creator) {
    var tempID = new ObjectID();
    var numAnswers =[];
    for(var i=0; i < choices.length;i++){
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

    newPoll.save(function(err) {
        if (err) {
            return console.error(err);
        } else {
            return tempID;
        }

    }).then(function() {
        userModel.findOneAndUpdate({
            githubDisplay: creator
        }, {
            $push: {
                'createdPolls': tempID
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        }, function(err, doc) {
            //mongoose.disconnect();
        })
    });

    return tempID;
}

var pollModel = mongoose.model('poll', pollSchema, 'polls');
module.exports = pollModel;
