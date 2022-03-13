const express = require('express');
const path = require('path');
const app = express();

//setting
app.set('port', process.env.PORT || 8080);
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routes
app.use(require('./routes'));


//server
const server = app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto 8080");
});

server.on('close', err => {
    console.log(err)
});
