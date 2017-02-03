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
            user: req.user,
            userAuth: req.isAuthenticated()
        });
    } else {
        res.render('404');
    }
})

router.post('/log', function(req, res) {

    var result = poll.schema.methods.newPoll(req.body.question, req.body.answers, req.user.displayName);
    res.redirect('/poll/'+result);
})

module.exports = router;
