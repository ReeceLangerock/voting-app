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
    'createdBy': String,
    'creationDate': Date
});


pollSchema.methods.newPoll = function(question, choices, creator) {
    var tempID = new ObjectID();
    var newPoll = new pollModel({
        '_id': tempID,
        'pollQuestion': question,
        'pollData': {
            'pollChoices': choices,
            'pollResponses': 0
        },
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
        console.log("thening")
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
            mongoose.disconnect();
        })
    });

    return tempID;
}




var pollModel = mongoose.model('poll', pollSchema, 'polls');
module.exports = pollModel;
