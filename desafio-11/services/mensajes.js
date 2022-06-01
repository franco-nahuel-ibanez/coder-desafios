const Mensaje = require('../model/Mensaje');

class MensajesController {

    async add(data){
        try {
            const nuevoMsj = new Mensaje(data)
            await nuevoMsj.save()
        } catch (error) {
            throw new Error("No se pudo agragar el nuevo dato")
        }
    };

    async getAll(){
        try {
            const mensajes = await Mensaje.find()
            return mensajes
        } catch (error) {
            throw new Error("No se pudo acceder a los datos")
        }
    }

    async getById(id){
        try {
            if(!id) throw new Error('Debe ingresar un "ID"')
            const mensaje = await Mensaje.findById(id)
            return mensaje
        } catch (error) {
            throw new Error('No se encontro el registro con id: ', id)
        }
    }

    async deleteById(id){
        try {
            if(!id) throw new Error('Debe ingresar un "ID"');
            const mensaje = await Mensaje.deleteById(id)
            return mensaje
        } catch (error) {
            throw new Error('No se pudo eliminar el registro con id: ', id)
        }
    }

    async deleteAll(){
        try {
            await Mensaje.deleteMany({})
            return "Todos los registros han sido eliminados"
        } catch (error) {
            throw new Error("No se pudo eliminar los registros")
        }
    }
}

module.exports = MensajesController