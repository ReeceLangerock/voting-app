var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  console.log("signout");
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
