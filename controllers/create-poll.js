var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
        if(req.isAuthenticated()){
        res.render('create-poll', {
            userAuth: req.isAuthenticated()
        });
      }
      else{
        res.send("404");
      }

})

router.post('/log', function(req, res) {

    var result = poll.schema.methods.newPoll(req.body.question, req.body.answers, req.user.displayName);
    console.log("\nredirect to id\n")
    res.redirect('/poll/'+result);
})



module.exports = router;
