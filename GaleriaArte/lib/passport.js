const passport = require('passport')
const {Strategy} = require('passport-local')
const localStrategy = require('passport-local').Strategy
const nodemailer = require('nodemailer')

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

    // NODEMAILER PARA CUANDO TE REGISTRAS

    const transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'germanmazku@gmail.com',
            pass: 'oicdwthwgwndlopl' ,
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: 'germanmazku@gmail.com',
        to: email,
        subject: 'Nueva Cuenta',
        text: 'Gracias por registrarte en Nine Eyes!'
        
      
      };

      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, function(err, succ){
        if(err){
            console.log(err)
        }else{
            console.log("Enviado", mailOptions.to)
            console.log("Datos:", succ)
        }
      });
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