const { Container } = require('../../containers/Container');
const product = require('../../models/product');

let app = null;
class DaoProduct extends Container {
    constructor(){
        super(product);
    }
    static getInstance(){
        if(!app){
            app = new DaoProduct();
        }
        return app;
    }
}

module.exports = { DaoProduct };