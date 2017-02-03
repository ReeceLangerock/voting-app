var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');
var moment = require('moment');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', function(req, res) {

    var recentQueryPromise = queryRecentPolls();
    var popularQueryPromise = queryPopularPolls();

    Promise.all([recentQueryPromise, popularQueryPromise]).then(function(responses, error) {
        res.locals = {
            recentPolls: responses[0],
            popularPolls: responses[1],
             moment: moment
        };
        res.render('index', {
            userAuth: req.isAuthenticated()
        })
    })
})


function queryRecentPolls() {

    return new Promise(function(resolve, reject) {
        poll.find({}).limit(50).sort({
            'creationDate': -1
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
            {'totalResponses':-1}).exec(function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj);
            }
        })
    });

}

module.exports = router;
