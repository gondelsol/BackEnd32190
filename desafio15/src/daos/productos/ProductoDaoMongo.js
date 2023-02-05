const {ContainerMongo} = require('../../containers/containerMongo');
const producto = require('../../models/producto');

class ProductDaoMongo extends ContainerMongo {
    constructor(){
        super(producto);
    }
}

module.exports = {ProductDaoMongo};