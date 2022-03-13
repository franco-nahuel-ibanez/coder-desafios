const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

//setting
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('port', process.env.PORT || 8080);
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: path.join(__dirname, 'views/layout/layout.hbs'),
        partialsDir: path.join(__dirname, 'views/partials')
    })
);

app.set('view engine', 'hbs');

//routes
app.use(require('./routes'));

//server
const server = app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto 8080");
});

server.on('close', err => {
    console.log(err)
});
