var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    if (req.user) {
        res.render('create-poll', {
            user: req.user
        });
    } else {
        res.send("404");
    }
})

router.post('/log', function(req, res) {

      poll.schema.methods.newPoll(req.body.question, req.body.answers, req.user.displayName);

    res.send("posted");
})


module.exports = router;
