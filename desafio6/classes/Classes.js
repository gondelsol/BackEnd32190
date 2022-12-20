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
}

module.exports = { Contenedor }