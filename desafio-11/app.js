const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { getData, addProduct, addMessage } = require('./helpers/data');
const {router, user} = require('./routes/router.index')
const routerProcess = require('./routes/router.process')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('./helpers/passport')
const args = require('./yargs.config')

require('dotenv').config()
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
        mongoUrl: process.env.MONGO_URL,
        ttl: 300,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('port', args.port);
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: path.join(__dirname, 'views/layout'),
        partialsDir: path.join(__dirname, 'views/partials')
    })
);

app.use(router);
app.use(routerProcess);

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

server.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});