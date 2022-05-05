const router = require('express').Router();
const products = require('../helpers/faker')
const Mensaje = require('../model/Mensaje')

router.get('/api/productos-test', (req, res) => {
    res.render('layout', {
        products
    })
})

router.post('/msj-test', async (req, res) => {
    const mensaje = new Mensaje(req.body)
    await mensaje.save()
    res.send('guardado')
})

router.get('/msj-test', async (req, res) => {
    const mensaje = await Mensaje.find()
    res.json(mensaje)
})


module.exports = router;