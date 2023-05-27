const passport = require('passport')
const {Strategy} = require('passport-local')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    console.log('comprobando usuario')
    if(rows.length > 0){
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        console.log('usuario existe')
        
        if(validPassword){
            console.log('contrase;a bien')
            done(null, user)
            
        }else{
            done(null, false)
        }
    }else{
        done(null, false, console.log('User does not exist'))
    }
}
))


passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const {email} =req.body
    const newUser = {
        username,
        password,
        email
    }
    console.log('datos recogidos')
    newUser.password = await helpers.encryptPassword(password)
    console.log('contrase;a enctriptada')

    const [result] = await pool.query('INSERT INTO users SET ?', [newUser])
    console.log('datos en la db')
    newUser.id = result.insertId
    return done(null, newUser)
}
))

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    done(null, rows[0])
})