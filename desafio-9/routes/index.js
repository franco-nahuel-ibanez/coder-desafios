const router = require('express').Router();
const products = require('../helpers/faker')
const Mensaje = require('../model/Mensaje')
const auth = require('../middleware/auth');
const path = require('path');

const user = {}

router.get('/', auth, (req, res) => {
    user.name = req.session.user
    return res.sendFile(path.resolve("public/index.html"))
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    const {name} = req.body
    if(!name) return res.status(400).json({error: "Debes ingresar un nombre"})
    req.session.user = name
    return res.redirect('/')
})

router.post('/logout', (req, res) => {
    const user = req.session.user
    req.session.destroy( err => {
        if(!err) res.render('table', {user})
        else res.send({status: 'Logout Error', body: err})
    })
})

router.get('/api/productos-test', auth, (req, res) => {
    const user = req.session.user
    res.render('table', {
        user,
        products
    })
})

router.post('/msj-test', auth, async (req, res) => {
    const mensaje = new Mensaje(req.body)
    await mensaje.save()
    res.send('guardado')
})

router.get('/msj-test', async (req, res) => {
    const mensaje = await Mensaje.find()
    res.json(mensaje)
})

module.exports = {
    router,
    user
};