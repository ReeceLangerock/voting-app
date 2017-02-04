//setup ========================================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');
var moment = require('moment');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

//get site home page ===========================================================
router.get('/', function(req, res) {

    // promises from mongoose queries to get recent and popular polls
    var recentQueryPromise = queryRecentPolls();
    var popularQueryPromise = queryPopularPolls();

    // when both promises are returned, store query results in locals and render
    // the page
    Promise.all([recentQueryPromise, popularQueryPromise]).then(function(responses, error) {
        res.locals = {
            recentPolls: responses[0],
            popularPolls: responses[1],
             moment: moment //incuded to format date poll was created
        };
        res.render('index', {
            userAuth: req.isAuthenticated()
        })
    })
})


function queryRecentPolls() {

    return new Promise(function(resolve, reject) {
        poll.find({}).limit(50).sort({
            'creationDate': -1 //sort by creation date
        }).exec(function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj);
            }
        })
    });
}


function queryPopularPolls() {
    return new Promise(function(resolve, reject) {
        poll.find({}).limit(50).sort(
            {'totalResponses':-1 //sort by number of responses
          }).exec(function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj);
            }
        })
    });

}

module.exports = router;
