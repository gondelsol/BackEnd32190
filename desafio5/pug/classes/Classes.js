const fs = require('fs');
class Contenedor {
    constructor(nombre_archivo){
        this.nombre_archivo = nombre_archivo;
    }

    async save(data){
        const arrData = await this.getAll();
        data.id = 1;

        // SI el archivo existe, obtiene el ultimo id y le suma 1
        if(arrData.length > 0){
            data.id = arrData[arrData.length - 1].id + 1;
        }
        arrData.push(data);
        try {
            await fs.promises.writeFile(this.nombre_archivo, JSON.stringify(arrData));
            return data.id;
        }
        catch (error) {
            console.warn(error);
        }
    }

    async getById(id){
        const arrData = await this.getAll();
        try {
            const theElement = arrData.find(item => item.id == id);
            if(theElement == undefined){
                throw new Error('No existe el id seleccionado');
            }
            return theElement;
        }
        catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
            return null;
        }
    }
    async updateById(id, data){
        const arrData = await this.getAll();
        try {
            const refProd = arrData.findIndex(item => item.id == id);
            if(refProd < 0){
                throw new Error('No existe el id seleccionado');
            }
            arrData[refProd].title = data.title;
            arrData[refProd].price = data.price;
            arrData[refProd].thumbnail = data.thumbnail;
            console.log("Producto", arrData);
            await fs.promises.writeFile(this.nombre_archivo, JSON.stringify(arrData));
            return arrData[refProd];
        }
        catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
            return null;
        }
    }
    async getAll(){
        try {
            let data = await fs.promises.readFile(this.nombre_archivo, 'utf8');
            return await JSON.parse(data);
        }
        catch(error) {
            console.log('El archivo no existe, devuelvo vacío');
            return [];
        }
    }

    async deleteById(id){
        const arrData = await this.getAll();
        try {
            if(await this.getById(id) == null){
                throw new Error('No existe el id seleccionado');
            }
            const newData = arrData.filter(item => item.id != id);
            await fs.promises.writeFile(this.nombre_archivo, JSON.stringify(newData));
        }
        catch (error) {
            console.warn(`Error al eliminar: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombre_archivo, '[]');
        }
        catch (error) {
            console.warn(`Error al eliminar todos: ${error.message}`);
        }
    }
}

module.exports = { Contenedor }