const {errorFile, infoConsol} = require('../helpers/logger')

class Contenedor {
    constructor( opciones, table ){
        this.knex = require('knex')(opciones);
        this.table = table;        
    }

    async add(data){
        try {
            await this.knex(this.table).insert(data)
        } catch (error) {
            infoConsol.info("No se pudo agragar el nuevo dato")
            errorFile.error("No se pudo agragar el nuevo dato")
            throw new Error("No se pudo agragar el nuevo dato")
        }
    };

    async getAll(){
        try {
            return await this.knex.from(this.table).select('*')
        } catch (error) {
            infoConsol.info("No se pudo acceder a los datos")
            errorFile.error("No se pudo acceder a los datos")
            throw new Error("No se pudo acceder a los datos")
        }
    }

    async getById(id){
        try {
            if(!id) throw new Error('Debe ingresar un "ID"')
            return await this.knex.from(this.table).select('*').where('id', '=', id)
        } catch (error) {
            infoConsol.info(`No se encontro el registro con id: ${id}`)
            errorFile.error(`No se encontro el registro con id: ${id}`)
            throw new Error('No se encontro el registro con id: ', id)
        }
    }

    async deleteById(id){
        try {
            if(!id) throw new Error('Debe ingresar un "ID"');
            await this.knex.from(this.table).where('id', '=', id).del()
            return "Registro eliminado correctamente"
        } catch (error) {
            infoConsol.info(`No se pudo eliminar el registro con id: ${id}`)
            errorFile.error(`No se pudo eliminar el registro con id: ${id}`)
            throw new Error('No se pudo eliminar el registro con id: ',id)
        }
    }

    async deleteAll(){
        try {
            await this.knex.from(this.table).del()
            return "Todos los registros han sido eliminados"
        } catch (error) {
            infoConsol.info("No se pudo eliminar los registros")
            errorFile.error("No se pudo eliminar los registros")
            throw new Error("No se pudo eliminar los registros")
        }
    }

}

module.exports = Contenedor