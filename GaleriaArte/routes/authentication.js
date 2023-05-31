const express = require ('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedIn } = require('../lib/auth.js')
const { isNotLogged } = require('../lib/auth')

router.get('/register', isNotLogged,(req, res, next)=>{
    res.render('auth/register', {user: req.user})
})
router.post('/register', isNotLogged, passport.authenticate('local.signup',{
    successRedirect: '/upload',
    failureRedirect: '/authentication/login'
}))

router.get('/login', isNotLogged, (req, res)=>{
    res.render('auth/login', {user: req.user})
})
router.post('/login', isNotLogged,
    passport.authenticate('local.signin',{
        successRedirect: '/upload',
        failureRedirect: '/authentication/login'
    })
)

router.get("/logout" ,(req,res) =>{
    req.logOut( function(err){
      if(err){
        return next(err)
      }
    })
    res.redirect("/")
})

module.exports = router;