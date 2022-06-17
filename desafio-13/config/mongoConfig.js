const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mensajes', {
    useNewUrlParser: true,
})
.then( db => console.log("mongoDB conectado"))
.catch(error => console.log("algo salio mal"))

