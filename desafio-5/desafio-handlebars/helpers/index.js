const axios = require('axios');
const fs = require('fs').promises;

exports.getData = async () => {
    const {data: templateProducts} = await axios('http://localhost:8080/table.hbs')
    const {data: templateMsg} = await axios('http://localhost:8080/messages.hbs')

    const {data: products} = await axios('http://localhost:8080/productos')

    const data = await fs.readFile('./messages.txt', 'utf-8');
    const messages = JSON.parse(data);

    return { templateProducts, templateMsg, products, messages };
};

exports.addMessage = async(newMessage) => {
    const content = await fs.readFile( './messages.txt', 'utf-8');
    const oldContent = JSON.parse(content);

    const newContent = [...oldContent, newMessage];
    await fs.writeFile('./messages.txt', JSON.stringify(newContent, null, 2));
    return newContent;
};

exports.addProduct = async(product) => {
    const {data} = await axios.post('http://localhost:8080/productos', product)
    return data;
}