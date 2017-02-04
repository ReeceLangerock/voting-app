var express = require('express');
var router = express.Router();

//sign out of oAuth
router.get('/', (req, res) => {
  console.log("signout");
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
