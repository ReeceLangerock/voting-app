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
        if(response == false){
          res.render('404');
        }
        else{
        res.render('pollPage', {
            data: response,
            userAuth: req.isAuthenticated()
        });
      }
    })
})

router.post('/vote', function(req, res) {
    var voteIndex = req.body.index;
    var ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var pollID = req.body.id;
    checkIP(pollID, ipAddress).then(function(response, error) {
        if (response == true) {
            return true;
        } else {
            return false;
        }
    }).then(function(response, error) {
        if (response == false) {
            return recordVote(pollID, voteIndex, ipAddress);
        } else {
          res.writeHead(200, {
              'content-type': 'text/html'
          });
          res.write("denied");
          res.end();
        }
    }).then(function(response, error) {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write("recorded");
        res.end();

    });


});

//currently a placeholder for check IP function- returning true for new IP
function checkIP(pollID, ipAddress) {
    return new Promise(function(resolve, reject) {
        poll.findOne({
                _id: pollID,
                ipThatVoted: ipAddress
            },
            function(err, obj) {
                if (err) {
                    console.log(err);
                    return reject();

                } else if (obj) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })

    })

}

function recordVote(pollID, voteIndex, ipAddress) {
    return new Promise(function(resolve, reject) {
        //voteIndex = Number(voteIndex);
        var answerToUpdate = 'pollData.pollResponses.' + voteIndex;
        poll.findOneAndUpdate({
            _id: pollID

        }, {
            $inc: {
                ['pollData.pollResponses.' + voteIndex]: 1,
                totalResponses: 1,
            },
            $push: {
                ipThatVoted: ipAddress
            },

        }, {
            safe: true,
            upsert: true,
            new: true

        }, function(err, doc) {
            if (err) {
                console.log("error");
                console.log(err);
                return reject;
            } else {
                return resolve(true);
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
            } else if(obj){
                return resolve(obj);
            }
            else{
              return resolve(false);
            }

        });
    });
}

module.exports = router;
