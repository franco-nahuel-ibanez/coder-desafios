const router = require('express').Router();

let productos = [];


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/productos', (req, res) => {
    res.render('products', { productos })
})


router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if( !title || !price || !thumbnail ) res.json({'error': 'Todos los campos son obligatorios'});
    
    const idProductos = productos.map( p => p.id );
    const maxId = Math.max(...idProductos) + 1;
    const id = maxId > 0 ? maxId : 1;
    
    const nuevoProducto = {
        id,
        title,
        price,
        thumbnail
    }
    productos = [...productos, nuevoProducto]
    
    res.redirect('/');
});



module.exports = router;