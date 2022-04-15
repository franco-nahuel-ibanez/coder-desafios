const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { getData, addProduct, addMessage } = require('./helpers');

require('./tables/index');

const app = express();
const server = http.createServer(app);
const io = new Server(server)

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
app.use(express.static('public'))

app.use(require('./routes'));

io.on('connection', async (socket) => {
    const { templateProducts, templateMsg, products, messages } = await getData();

    socket.emit('products', { templateProducts, templateMsg, products, messages })
    
    socket.on('addProducts', async (product) => {
        const products = await addProduct(product)
        io.sockets.emit('newProducts', products);
    })

    socket.on('newMessage', async(newMessage) => {
        const newMessages = await addMessage(newMessage);
        io.sockets.emit('messages', newMessages);
    })
})

//server
server.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});

module.exports = app