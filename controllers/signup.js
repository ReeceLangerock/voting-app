var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../models/user');
//router.use('../models/user', createUser);

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    res.render('signup', {
      data: req.isAuthenticated()
    });
})


router.post('/', function(req, res) {
    checkForUser(req.body.username).then(function(response, error) {
        if (error) {
            throw error;
        }
        console.log("response: " +response);
        if (response === true) {
            res.send("username taken");
            res.status(200).end();
        } else if (response === false) {
            var goodPassword = validatePassword(req.body.password1, req.body.password2);
            if (!goodPassword) {
                res.send("passwords dont match");
            }
            else if (goodPassword){
              user.schema.methods.newUser(req.body.username, req.body.password1);
              res.status(200).end();
            }
        }
    });

})

function checkForUser(username) {
    return new Promise(function(resolve, reject) {
        user.findOne({
            _id: username
        }, function(err, obj) {
            if (err) {
                return reject();
            } else if (obj) {
                return resolve(true); // if username already taken return true
            } else {
                return resolve(false); // else return false
            }
        });
    });
}

function validatePassword(pass1, pass2) {
    if (pass1 === pass2) {
        return true;
    } else {
        return false;
    }

}

module.exports = router;
