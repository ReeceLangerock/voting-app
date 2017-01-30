var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var poll = require('../models/poll');



router.get('/', function(req, res) {
    res.send('404');
})

router.get('/:id', function(req, res) {
    var id = req.params.id;
    console.log("before getPoll query");
    getPoll(id).then(function(response, error) {
        if (error) {
            throw error
        }
            console.log(":id");
            res.render('pollPage', {
              data: response
            });


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
                return resolve(obj);
            }

        });
    });
}

module.exports = router;
