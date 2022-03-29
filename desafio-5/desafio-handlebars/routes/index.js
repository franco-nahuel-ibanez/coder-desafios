const router = require('express').Router();

let products = []

router.get('/', (req, res) => {
    res.sendFile(__diname, '../index.html')
});

router.get('/productos', (req, res) => {
    res.json(products)
})


router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if( !title || !price || !thumbnail ) res.json({'error': 'Todos los campos son obligatorios'});
    
    const idProducts = products.map( p => p.id );
    const maxId = Math.max(...idProducts) + 1;
    const id = maxId > 0 ? maxId : 1;
    
    const newProduct = {
        id,
        title,
        price,
        thumbnail
    }
    products = [...products, newProduct]
    
    res.json(products);
});


module.exports = router;