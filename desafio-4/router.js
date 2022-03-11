const router = require('express').Router();

let productos = [
    {
        id: 1,
        title: "batidora",
        price: 400,
        thumbnail: "batidora.jpg"
    },
    {
        id: 2,
        title: "licuadora",
        price: 500,
        thumbnail: "licuadora.png"
    }
];


router.get('/', (req, res) => {
    res.json(productos)
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find( p => p.id === id )
    
    if(!producto) res.json({'error': 'Producto no encontrado'})

    res.json(producto) 
});

router.post('/', (req, res) => {
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
    res.status(201).json(nuevoProducto)
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const {title, price, thumbnail} = req.body;
    
    if(!title || !price || !thumbnail) return res.status(412).json({"error": "Todos los campos son obligatorios"});

    const producto = productos.find(p => p.id);
    if(!producto) return res.status(404).json({"error": "El producto no existe"})

    const nuevoProducto = {
        id,
        title, 
        price,
        thumbnail
    }

    productos = productos.filter( p => p.id !== id );
    productos = [...productos, nuevoProducto]
    console.log(productos);
    res.status(200).json({"ok": "producto modificado"});
});


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);
    if(!producto) return res.status(404).json({"error": "El producto no existe"})

    productos = productos.filter(p => p.id !== id);

    res.status(200).json({"ok": "Producto eliminado"})
})


module.exports = router;