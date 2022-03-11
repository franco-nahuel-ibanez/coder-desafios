const Contenedor = require('./app');

const producto = new Contenedor('productos');


const globoTerraqueo = {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}

console.log("Estado inicial del documento:")
producto.getAll()
    .then( res => {
        console.log(res)
    })
    .catch(err => console.log("error"));



// console.log("Agregar un producto: ");
// producto.save(globoTerraqueo)
//     .then( res => {
//         console.log(res)
//         console.log('##############')
//     })
//     .catch(error => console.log(error));



// console.log('Buscar producto con ID 2: ') 
// producto.getById(2)
//     .then(res => {
//         console.log(res)
//         console.log("##############")
//     })
//     .catch( err => console.log(err))


// console.log("eliminar producto con ID 1")
// producto.deleteById(1)
//     .then( () => console.log("eliminado") )
//     .catch( err => console.log(err)  )


// console.log("eliminar todos los productos")
// producto.deleteAll()
//     .then( res => console.log("eliminado") );



