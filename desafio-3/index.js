const express = require('express');
const Contenedor = require('./contenedor');

const app = express();

//setting
app.set('port', process.env.PORT || 3000);

const producto = new Contenedor('productos');

//routes
app.get('/productos', async (req, res) => {
    try {
        const productos = await producto.getAll();
        res.json(productos);
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/productoRandom', async (req, res) => {
    const response = await producto.getRandom() 
    res.send(response)
})


app.listen( app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})