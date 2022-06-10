const {Schema, model} = require('mongoose');

const mensajeSchema = new Schema({
    author: {
        id: {
            type: String, 
            required: true,
            trim: true
        },
        nombre:{
            type: String, 
            required: true,
            trim: true
        },
        apellido: {
            type: String, 
            required: true,
            trim: true
        },
        edad: {
            type: String,
            required: true
        },
        alias: {
            type: String, 
            trim: true
        },
        avatar: {
            type: String
        }
    },
    text: {
        type: String
    },
    date: {
        type: String,
    }
})

mensajeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject.__v
    }
});

module.exports = model('Mensaje', mensajeSchema)