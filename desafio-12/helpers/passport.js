const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Usuario = require('../model/Usuarios');
const bcrypt = require('bcrypt')

//login
passport.use('login', new LocalStrategy( async (username, password, done) => {
    //verificar si el usuario existe en la base de datos
    const usuario = await Usuario.findOne({ username })

    if(!usuario){
        return done(null, false)
    }
    //verificamos que la contraseña sea correcta
    const coincide = await bcrypt.compare(password, usuario.password)
    if(!coincide){
        return done(null, false)
    }
    return done(null, usuario)
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.username)
})

passport.deserializeUser(async (username, done) => {
    const usuario = await Usuario.find({username})
    done(null, usuario)
})

module.exports = passport