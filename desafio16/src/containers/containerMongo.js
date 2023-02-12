const config = require('../config/globals')
const mongoose = require('mongoose');

class ContainerMongo {
    constructor(model){
        this.model = model;
        mongoose.connect(
            config.MONGO_URI, 
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
                // console.log("Base de datos conectada");
            }
        );
    }
    async save(data) {
        try {
            data.dateTime = new Date();
            return await this.model.create(data)
        } catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
        }
	}
    async getById(id){
        try {
            const item = await this.model.findById(id);
            return item;
        }
        catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
            return null;
        }
    }

    async updateById(id, data){
        try {
            const rowUpdate = await this.model.findOneAndUpdate({_id: id}, data);
            return rowUpdate;
        }
        catch (error) {
            console.warn(`Error al actualizar: ${error.message}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.model.find()
        } catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
            return [];
        }
    }

    async deleteById(id){
        try {
            const rowDelete = await this.model.findOneAndDelete({_id: id});
        }
        catch (error) {
            console.warn(`Error al eliminar: ${error.message}`);
        }
    }
}

module.exports = {ContainerMongo};