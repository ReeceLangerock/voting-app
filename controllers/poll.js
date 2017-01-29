var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');



router.get('/', function(req, res) {
    res.render('pollPage');
})

router.get('/:id', function(req, res) {
    var id = req.params.id;
    getPoll(id).then(function(response, error) {
        if (error) {
            throw error
        }
          console.log(response);
            res.render('pollPage', {
              data: response
            });


    }).catch(function(err){
      res.status(500).send(err);
    })
})

function getPoll(pollID) {
    return new Promise(function(resolve, reject) {
        poll.findOne({
            _id: pollID
        }, function(err, obj) {
            if (err) {
                return reject();
            } else {
                return resolve(obj); // if username already taken return true
            }

        });
    });
}

module.exports = router;
