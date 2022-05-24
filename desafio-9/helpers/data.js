const axios = require('axios')
const Contenedor = require('../services/contenedor')
const {mysqlConfig} = require('../config/mysqlConfig');
const MensajesController = require('../services/mensajes');

const productSchema = new Contenedor(mysqlConfig, 'productos');
const messageSchema = new MensajesController()
const normalizar = require('./normalizarMsj')

exports.getData = async () => {
    try {
        const {data: templateProducts} = await axios(`http://localhost:8080/table.hbs`)
        const {data: templateMsg} = await axios(`http://localhost:8080/messages.hbs`)
    
        const products = await productSchema.getAll();
        const messagesBD = await messageSchema.getAll();
        const messages = normalizar(messagesBD)

        return { templateProducts, templateMsg, products, messages }
    } catch (error) {
        console.log({error});
    }
};

exports.addMessage = async(newMessage) => {
    try {
        if(!newMessage) throw new Error("Debe ingresar un mensaje");
        await messageSchema.add(newMessage);
        const messagesBD = await messageSchema.getAll();
        const messages = normalizar(messagesBD)
        return messages;
    } catch (error) {
        console.log(error)
        return error
    }
}

exports.addProduct = async (product) => {
    try {
        if(!product) throw new Error('Debe ingresar un producto valido')
        const newProduct ={
            title: product.title,
            price: Number(product.price),
            thumbnail: product.thumbnail
        }
        await productSchema.add(newProduct);
        return await productSchema.getAll();
    } catch (error) {
        return error
    }
}