//setup ========================================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

//get calls to /poll/:id, query mongodb for correct poll and render page =======
router.get('/:id', function(req, res) {
    var id = req.params.id; // get id of poll

    //mongoose query for poll
    getPoll(id).then(function(response, error) {
        if (error) {
            throw error
        }
        if(response == false){
          res.render('404'); // poll id not found
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
    var voteIndex = req.body.index; // get index of vote sent in post
    var ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var pollID = req.body.id;
    // promise chain to query the poll for the ipaddress trying to vote
    checkIP(pollID, ipAddress).then(function(response, error) {
        if (response == true) { // send query result to .then
            return true;
        } else {
            return false;
        }
    }).then(function(response, error) {
        if (response == false) {
            return recordVote(pollID, voteIndex, ipAddress); // record vote
        } else {
          res.writeHead(200, { // return post rejection if ip address was found
              'content-type': 'text/html'
          });
          res.write("denied");
          res.end();
        }
    }).then(function(response, error) {
        res.writeHead(200, { // return post acceptance
            'content-type': 'text/html'
        });
        res.write("recorded");
        res.end();

    });


});

//query mongodb to see if IP address has been used for a vote yet =============
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
                    return resolve(true); // if ip address was found return true
                } else {
                    return resolve(false); // ip address not found return false
                }
            })

    })

}


function recordVote(pollID, voteIndex, ipAddress) {
    return new Promise(function(resolve, reject) {
        //voteIndex = Number(voteIndex);
        var answerToUpdate = 'pollData.pollResponses.' + voteIndex;
        poll.findOneAndUpdate({
            _id: pollID // find poll

        }, {
            $inc: { // increment the total responses and the vote that was cast
                ['pollData.pollResponses.' + voteIndex]: 1,
                totalResponses: 1,
            },
            $push: {
                ipThatVoted: ipAddress // store teh ip address being voted from
            },

        }, {
            safe: true,
            upsert: true,
            new: true

        }, function(err, doc) {
            if (err) {
                console.log(err);
                return reject;
            } else if(doc){
            return resolve(true);
          }
              else {
                return resolve(false);
            }
        });
    })
}

//query mongodb for the poll
function getPoll(pollID) {
    return new Promise(function(resolve, reject) {
        poll.findOne({
            _id: pollID
        }, function(err, obj) {
            if (err) {
                return reject();
            } else if(obj){ // if found return pollData
                return resolve(obj);
            }
            else{ // else return false
              return resolve(false);
            }

        });
    });
}

module.exports = router;
