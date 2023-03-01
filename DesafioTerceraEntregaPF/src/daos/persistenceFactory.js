const config = require('../config/globals');

let DaoProduct, DaoCart, DaoUser;
class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case 'mongo':
                const { DaoProduct: product } = require('./product/DaoProduct');
                const { DaoCart: cart } = require('./cart/DaoCart');
                const { DaoUser: user } = require('./user/DaoUser');
                DaoProduct = product.getInstance();
                DaoCart = cart.getInstance();
                DaoUser = user.getInstance();
                return { DaoProduct, DaoCart, DaoUser };
        }
    }
}
module.exports = PersistenceFactory;