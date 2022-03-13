const express = require('express');
const path = require('path');
const app = express();

//setting
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('port', process.env.PORT || 8080);

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use(require('./routes'));

//server
const server = app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto 8080");
});

server.on('close', err => {
    console.log(err)
});
