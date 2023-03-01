const PersistenceFactory = require('../daos/persistenceFactory');

class UserService {
    constructor() {
        this.userDao;
        this.init();
    }
    init = async () => {
        const { DaoUser } = await PersistenceFactory.getPersistence();
        this.userDao = DaoUser;
    }
    save = async (user) => {
        return await this.userDao.save(user);
    }
    getAll = async () => {
        return await this.userDao.getAll();
    }
    getById = async (id) => {
        return await this.userDao.getById(id);
    }
    updateById = async (id, user) => {
        return await this.userDao.updateById(id, user);
    }
    deleteById = async (id) => {
        return await this.userDao.deleteById(id);
    }
}

module.exports = UserService;