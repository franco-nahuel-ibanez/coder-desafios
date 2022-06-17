const router = require('express').Router();
const products = require('../helpers/faker')
const Mensaje = require('../model/Mensaje')
const auth = require('../middleware/auth');
const path = require('path');
const Usuario = require('../model/Usuarios')
const bcrypt = require('bcrypt');
const passport = require('passport');
const {infoConsol} = require('../helpers/logger')
const user = {}


router.get('/', auth, (req, res) => {
    user.name = req.session.user
    return res.sendFile(path.resolve("public/index.html"))
})

router.get('/login', (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    res.render('login')
})

router.post(
    '/login',
    passport.authenticate('login', {failureRedirect: '/faillogin'}),
    (req, res) => {
        infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
        const {username} = req.body
        req.session.user = username
        res.redirect('/')
    }
)

router.post('/logout', (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    const user = req.session.user
    req.session.destroy( err => {
        if(!err) res.render('table', {user})
        else res.send({status: 'Logout Error', body: err})
    })
})

router.get('/register', (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    res.render('register')
})


router.post('/register', async (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    try {
        const {username, password, direccion} = req.body
        if(!username || !password || !direccion) {
            throw Error("Error al registrar usuario")
        }

        //encriptar password
        const salt = await bcrypt.genSalt(10);
        const passEncripted = await bcrypt.hash(password, salt)
        const usuario = new Usuario({
            username, 
            password: passEncripted, 
            direccion
        })
        await usuario.save()
        res.redirect('/login')    
    } catch (error) {
        console.log(error)
        res.redirect('/failsignup')
    }
})

router.get('/failsignup', (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    res.render('register-error')
})

router.get('/faillogin', (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    res.render('login-error')
})

router.get('/api/productos-test', auth, (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    const user = req.session.user
    res.render('table', {
        user,
        products
    })
})

router.post('/msj-test', auth, async (req, res) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    const mensaje = new Mensaje(req.body)
    await mensaje.save()
    res.send('guardado')
})

router.get('/msj-test', async (req, res, next) => {
    infoConsol.info(`path: [${req.url}] - method: [${req.method}]`)
    const mensaje = await Mensaje.find()
    res.json(mensaje)
    next()
})

module.exports = {
    router,
    user
};