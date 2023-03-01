const PersistenceFactory = require('../daos/persistenceFactory');

class CartService {
    constructor() {
        this.cartDao;
        this.init();
    }
    init = async () => {
        const { DaoCart } = await PersistenceFactory.getPersistence();
        this.cartDao = DaoCart;
    }
    getAll = async () => {
        return await this.cartDao.getAll();
    }
    save = async (product) => {
        return await this.cartDao.save(product);
    }
    getById = async (id) => {
        return await this.cartDao.getById(id);
    }
    updateById = async (id, product) => {
        return await this.cartDao.updateById(id, product);
    }
    deleteById = async (id) => {
        return await this.cartDao.deleteById(id);
    }
    addProduct = async (idCarrito, productos) => {
        const data = await this.cartDao.addProduct(idCarrito, productos);
        return data;
    }
    deleteProduct = async (idCarrito, idProd) => {
        return await this.cartDao.deleteProduct(idCarrito, idProd);
    }
    deleteProductOne = async (idCarrito, idProd) => {
        return await this.cartDao.deleteProductOne(idCarrito, idProd);
    }
    getUserCart = async (id) => {
        return await this.cartDao.getUserCart(id);
    }
}

module.exports = CartService;
