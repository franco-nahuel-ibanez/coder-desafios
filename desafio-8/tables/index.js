const { mysqlConfig } = require('../config/mysqlConfig')

const dbProductos = require('knex')(mysqlConfig);
// const dbMesajes = require('knex')(sqliteConfig);

//crear tabla de productos
dbProductos.schema.hasTable('productos').then( exists => {
    if (!exists) {
      return dbProductos.schema.createTable('productos', t => {
        t.increments('id'),
        t.string('title'),
        t.integer('price'),
        t.string('thumbnail')    
      })
    }
  })
    .then(() => console.log('tabla "productos" creada'))
    .catch( err => {console.log({'crear tabla':err}); throw err} )
    .finally(() => {
        dbProductos.destroy();
    })


//crear tabla de mensajes
// dbMesajes.schema.hasTable('mensajes').then( exists => {
//     if (!exists) {
//         return dbMesajes.schema.createTable('mensajes', t => {
//             t.increments('id')
//             t.string('email')
//             t.timestamp('date')
//             t.string('msg')
//         });
//     }
// })
//     .then(() => console.log('tabla "mensajes" creada'))
//     .catch( err => {console.log(err); throw err} )
//     .finally(() => {
//         dbMesajes.destroy();
//     })
