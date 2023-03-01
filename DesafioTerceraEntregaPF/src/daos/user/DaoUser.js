const { Container } = require('../../containers/Container');
const user = require('../../models/user');

let app = null;
class DaoUser extends Container {
    constructor(){
        super(user);
    }
    static getInstance(){
        if(!app){
            app = new DaoUser();
        }
        return app;
    }
}

module.exports = { DaoUser };