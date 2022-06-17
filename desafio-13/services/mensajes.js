const Mensaje = require('../model/Mensaje');
const {errorFile, infoConsol} = require('../helpers/logger')

class MensajesController {

    async add(data){
        try {
            const nuevoMsj = new Mensaje(data)
            await nuevoMsj.save()
        } catch (error) {
            infoConsol.info("No se pudo agragar el nuevo dato")
            errorFile.error("No se pudo agragar el nuevo dato")
            throw new Error("No se pudo agragar el nuevo dato")
        }
    };

    async getAll(){
        try {
            const mensajes = await Mensaje.find()
            return mensajes
        } catch (error) {
            infoConsol.info("No se pudo acceder a los datos")
            errorFile.error("No se pudo acceder a los datos")
            throw new Error("No se pudo acceder a los datos")
        }
    }

    async getById(id){
        try {
            if(!id) throw new Error('Debe ingresar un "ID"')
            const mensaje = await Mensaje.findById(id)
            return mensaje
        } catch (error) {
            infoConsol.info(`No se encontro el registro con id: ${id}`)
            errorFile.error(`No se encontro el registro con id: ${id}`)
            throw new Error('No se encontro el registro con id: ', id)
        }
    }

    async deleteById(id){
        try {
            if(!id) throw new Error('Debe ingresar un "ID"');
            const mensaje = await Mensaje.deleteById(id)
            return mensaje
        } catch (error) {
            infoConsol.info(`No se pudo eliminar el registro con id: ${id}`)
            errorFile.error(`No se pudo eliminar el registro con id: ${id}`)
            throw new Error('No se pudo eliminar el registro con id: ', id)
        }
    }

    async deleteAll(){
        try {
            await Mensaje.deleteMany({})
            return "Todos los registros han sido eliminados"
        } catch (error) {
            infoConsol.info("No se pudo eliminar los registros")
            errorFile.error("No se pudo eliminar los registros")
            throw new Error("No se pudo eliminar los registros")
        }
    }
}

module.exports = MensajesController