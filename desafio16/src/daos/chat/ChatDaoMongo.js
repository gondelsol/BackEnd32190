const {ContainerMongo} = require('../../containers/containerMongo');

const chat = require('../../models/chat');

class ChatDaoMongo extends ContainerMongo {
    constructor(){
        super(chat);
    }
}

module.exports = {ChatDaoMongo};