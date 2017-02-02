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
  if(req.isAuthenticated()){
    queryUserPolls(req.user.id).then(function(response, error) {
        if (error) {
            throw error;
        }
        return queryPolls(response);
    }).then(function(response, error) {
        res.locals = {
            polls: response
        };

        res.render('view-polls',{
          userAuth:req.isAuthenticated()
        })
    });
}else{
  res.send("404");
}
})

router.post('/delete', function(req, res) {

    deletePolls(req.body).then(function(response, error) {
        if (error) {
            throw error;
        }
        res.send({redirect: '/'});
    })

})


function deletePolls(pollArray) {
    return new Promise(function(resolve, reject) {

        poll.remove({
            _id: {
                $in: pollArray
            }
        }, function(err, obj) {
            if (err) {
                return reject(err);
            } else if (obj) {
                return resolve(true); // if username already taken return true
            }
        });
    });
}

function queryUserPolls(userID) {
    return new Promise(function(resolve, reject) {
        user.findOne({
            githubID: userID
        }, function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(obj.createdPolls);
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
