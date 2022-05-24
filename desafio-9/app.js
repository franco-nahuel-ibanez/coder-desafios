const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { getData, addProduct, addMessage } = require('./helpers/data');
const {router, user} = require('./routes/index')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');

require('./config/mongoConfig')
require('./tables/index');

const app = express();
const server = http.createServer(app);
const io = new Server(server)
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:admin@cluster0.vjifl.mongodb.net/sesiones?retryWrites=true&w=majority',
        ttl: 300,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.set('port', process.env.PORT || 8080);
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: path.join(__dirname, 'views/layout'),
        partialsDir: path.join(__dirname, 'views/partials')
    })
);
app.use(router);

app.set('view engine', 'hbs');
app.use(express.static('public'))

io.on('connection', async (socket) => {
    const { templateProducts, templateMsg, products, messages } = await getData();
    socket.emit('products', { templateProducts, templateMsg, products, messages, user })
    
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