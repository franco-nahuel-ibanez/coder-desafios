const express = require('express');
const app = express();


//settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('port', 8080);
app.use('/api/productos', require('./router'));
app.use(express.static('./public'));


const server = app.listen(app.get('port'), () => {
    console.log(`Servidor corrriendo en el Puerto ${app.get('port')}`)
})

server.on('error', (error) => console.log("Ocurrio un error en el Servidor"));