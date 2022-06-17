const {model, Schema} = require('mongoose')

const UsuarioSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    }
})


module.exports = model('Usuario', UsuarioSchema)