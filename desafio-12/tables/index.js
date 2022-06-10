const { mysqlConfig } = require('../config/mysqlConfig')
const dbProductos = require('knex')(mysqlConfig);

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