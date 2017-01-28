var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');
var user = require('../models/user');
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', function(req, res) {
    queryUserPolls(req.user.id).then(function(response, error) {
        if (error) {
            throw error;
        }
        return queryPolls(response);
    }).then(function(response, error) {
        res.locals = {
            polls: response
        };
        res.render('view-polls')
    });
})

router.post('/delete', function(req, res){

  console.log(req.body);
  //console.log(req.body);
})


function queryUserPolls(userID) {
    return new Promise(function(resolve, reject) {
        user.findOne({
            githubID: userID
        }, function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj.createdPolls); // if username already taken return true
            }
        });
    });
}

function queryPolls(polls) {
    return new Promise(function(resolve, reject) {
        poll.find({
            _id: {
                $in: polls
            }
        }, function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj); // if username already taken return true
            }
        });
    });

}
module.exports = router;
