const {faker} = require('@faker-js/faker')
faker.locale = 'es'
const {vehicle, image, finance} = faker;

const products = []

for (let index = 0; index < 5; index++) {
    let data = {
        title: vehicle.vehicle(),
        price: finance.amount(5,10,5,'$'),
        thumbnail: image.transport()
    }
    products.push(data)
}

module.exports = products;


