const fs = require('fs');

class Contenedor {
    constructor( archivo ){
        this.direccion = `./${archivo}.txt`;
        this.iniciar(archivo);
    };

    //comprobar si el archivo existe al instanciar la clase
    async iniciar(archivo)  {
        if(!fs.existsSync(`./${archivo}.txt`)){
            await fs.promises.writeFile(`./${archivo}.txt`, '[]');
        }
    };

    //guardar un objeto
    async save(objeto){
        try {
            const content = await this.getAll();
            const allId = content.map( c => c.id );
            const maxId = allId.length != 0 ? Math.max( ...allId ) + 1 : 1;
            
            const newObject = {
                id: maxId,
                ...objeto
            }
    
            const newContent = [...content, newObject];
            await fs.promises.writeFile(this.direccion, JSON.stringify(newContent, null, 2));
            
            return maxId;

        } catch (error) {
            throw new Error("No se pudo guardar el dato")
        }
    };


    //buscar por ID
    async getById(id){
        try {
            const content = await this.getAll();
            const objetc = content.find( o => o.id == id );
            const result = objetc ? objetc : null;

            return result;
        } catch (error) {
            throw new Error("Producto no encontrado")
            
        }
    };


    //obtener todos los objetos
    async getAll(){
        try {
            const content = await fs.promises.readFile( this.direccion, 'utf-8');
            // const result = JSON.parse(content)
            return JSON.parse(content);
        } catch (error) {
            throw new Error("No se pudo obtener los datos del documento")
        }
    };


    //Eliminar por ID
    async deleteById(id){
        try {
            let content = await this.getAll();
            content = content.filter( c => c.id !== Number(id) );
            await fs.promises.writeFile(this.direccion, JSON.stringify(content, null, 2) );
            
        } catch (error) {
            throw new Error("No se pudo eliminar el dato")
        }
    };

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.direccion, '[]')
        } catch (error) {
            throw new Error("No se pudo eliminar los datos del documento");
        }
    };
}


module.exports = Contenedor;