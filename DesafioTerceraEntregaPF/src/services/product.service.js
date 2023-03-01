const PersistenceFactory = require('../daos/persistenceFactory');

class ProductService {
    constructor() {
        this.productDao;
        this.init();
    }
    init = async () => {
        const { DaoProduct } = await PersistenceFactory.getPersistence();
        this.productDao = DaoProduct;
    }
    save = async (product) => {
        return await this.productDao.save(product);
    }
    getAll = async () => {
        return await this.productDao.getAll();
    }
    getById = async (id) => {
        return await this.productDao.getById(id);
    }
    updateById = async (id, product) => {
        return await this.productDao.updateById(id, product);
    }
    deleteById = async (id) => {
        return await this.productDao.deleteById(id);
    }
}

module.exports = ProductService;
