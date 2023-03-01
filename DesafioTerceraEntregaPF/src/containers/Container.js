const { MONGO_URI } = require('../config/globals')
const mongoose = require('mongoose');
const { createLogger } = require('../config/logger.config');
const logger = createLogger('PROD');
const app = null;

class Container {
    constructor(model){
        this.model = model;
        // logger.info("model", model, "Fin model");
        mongoose.connect(
            MONGO_URI, 
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
                logger.info("Base de datos conectada");
            }
        );
    }
    static getInstance = async () => {
        if(!app){
            app = new Container();
        }
        return app;
    }
    
    async save(data) {
        try {
            data.dateTime = new Date();
            return await this.model.create(data);
        } catch (error) {
            logger.warn(`Error al obtener: ${error.message}`);
        }
	}
    async getById(id){
        try {
            const item = await this.model.findById(id);
            return item;
        }
        catch (error) {
            logger.warn(`Error al obtener: ${error.message}`);
            return null;
        }
    }

    async updateById(id, data){
        try {
            const rowUpdate = await this.model.findOneAndUpdate({_id: id}, data);
            return rowUpdate;
        }
        catch (error) {
            logger.warn(`Error al actualizar: ${error.message}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.model.find()
        } catch (error) {
            logger.warn(`Error al obtener: ${error.message}`);
            return [];
        }
    }

    async deleteById(id){
        try {
            const rowDelete = await this.model.findOneAndDelete({_id: id});
            return {
                success: true
            }
        }
        catch (error) {
            logger.warn(`Error al eliminar: ${error.message}`);
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = { Container };