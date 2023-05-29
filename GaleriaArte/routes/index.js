var express = require('express');
var router = express.Router();
const { isLoggedIn} = require("../lib/auth");

/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('main', {user: req.user});
});

module.exports = router;
