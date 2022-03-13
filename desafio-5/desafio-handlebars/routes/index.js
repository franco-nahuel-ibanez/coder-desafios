const router = require('express').Router();

let productos = [
    {
        id: 1,
        title: "Radio",
        price: 250,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/music-flat-pixel-perfect/64/music-10-128.png"
    },
    {
        id: 2,
        title: "Computer",
        price: 700,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/seo-162/96/monitor_screen_computer_search_find_browser_website-128.png"
    }
];


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