var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', function(req, res) {
    res.send('404');
})

router.get('/:id', function(req, res) {
    var id = req.params.id;
    getPoll(id).then(function(response, error) {
        if (error) {
            throw error
        }
        res.render('pollPage', {
            data: response
        });


    })
})

router.post('/vote', function(req, res) {
    var voteIndex = req.body.index;
    var ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var pollID = req.body.id;
    checkIP(ipAddress).then(function(response, error) {
        if (response == true) {
            return true;
        } else {
            return false;
        }
    }).then(function(response, error) {
        if (response == true) {
            return recordVote(pollID, voteIndex);
            res.send("TEST");
        } else {

            res.send("TEST");
        }
    }).then(function(response, error) {
        console.log(response);
    });


});

//currently a placeholder for check IP function- returning true for new IP
function checkIP(ipAddress) {
    return new Promise(function(resolve, reject) {
        return resolve(true);
    })

}

function recordVote(pollID, voteIndex) {
    return new Promise(function(resolve, reject) {
        console.log(voteIndex);
        var answerToUpdate = `pollData.pollResponses[${voteIndex}]`;
        poll.findOneAndUpdate({
            _id: pollID

        }, {
            $inc: {
                answerToUpdate: 1
            }
        }, {
            safe: true,
            upsert: true,
            new: true

        }, function(err, doc) {
            if (err) {
                console.log(err);
                return reject;
            } else {
                console.log("resolve");
                return resolve(doc);
            }
        });
    })
}

function getPoll(pollID) {
    return new Promise(function(resolve, reject) {
        poll.findOne({
            _id: pollID
        }, function(err, obj) {
            if (err) {
                return reject();
            } else {
                return resolve(obj);
            }

        });
    });
}

module.exports = router;
