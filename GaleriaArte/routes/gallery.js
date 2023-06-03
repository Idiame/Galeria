var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../lib/auth.js')
const { isNotLogged } = require('../lib/auth')


router.get('/', (req, res, next) =>{
  res.render('gallery', {user: req.user});
});

module.exports = router;
