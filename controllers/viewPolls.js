//setup ========================================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');
var user = require('../models/user');
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

// get call to /view-polls
router.get('/', function(req, res) {
    if (req.isAuthenticated()) { // if user is authenticated
        //query db for the users polls
        queryUserPolls(req.user.id).then(function(response, error) {
            if (error) {
                throw error;
            }
            return queryPolls(response);
        }).then(function(response, error) {
            res.locals = { // store results of query
                polls: response
            };

            res.render('view-polls', {
                userAuth: req.isAuthenticated()
            })
        });
    } else { // if user isn't authenticated
        res.render('404');
    }
})

// if user posts a delete call
router.post('/delete', function(req, res) {

    deletePolls(req.body).then(function(response, error) {
        if (error) {
            throw error;
        }
        res.send({
            redirect: '/'
        });
    })
})

function deletePolls(pollArray) {
    return new Promise(function(resolve, reject) {

        poll.remove({
            _id: {
                $in: pollArray // remove the polls the user sent
            }
        }, function(err, obj) {
            if (err) {
                return reject(err);
            } else if (obj) {
                return resolve(true);
            }
            else{
              return false; // return false if the poll wasn't found
            }
        });
    });
}
//mongoose query to get the polls the user has created
function queryUserPolls(userID) {
    return new Promise(function(resolve, reject) {
        user.findOne({
            githubID: userID
        }, function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj.createdPolls); // return the polls
            }
            else{
              return false; // return false if the user wasn't found
            }
        });
    });
}

//mongoose query to get the info from the polls the user has created
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
                return resolve(obj); // if polls found return the info
            }
            else{
              return false; // return false if the pollData wasn't found
            }
        });
    });
}

module.exports = router;
