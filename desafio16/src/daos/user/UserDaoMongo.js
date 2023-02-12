const {ContainerMongo} = require('../../containers/containerMongo');
const user = require('../../models/user');

class UserDaoMongo extends ContainerMongo {
    constructor(){
        super(user);
    }
    async getByUsername(username){
        return await this.model.findOne({username: username});
    }
}

module.exports = {UserDaoMongo};