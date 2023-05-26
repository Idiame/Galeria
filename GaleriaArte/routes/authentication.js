const express = require ('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedIn } = require('../lib/auth.js')
const { isNotLogged } = require('../lib/auth')

router.get('/register', isNotLogged,(req, res, next)=>{
    res.render('auth/register')
})
router.post('/register', isNotLogged, passport.authenticate('local.signup',{
    successRedirect: '/gallery',
    failureRedirect: '/authentication/register'
}))

router.get('/login', isNotLogged, (req, res)=>{
    res.render('auth/login')
})
router.post('/login', isNotLogged, (req, res, next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/gallery',
        failureRedirect: '/authentication/login'
    })
})

module.exports = router;