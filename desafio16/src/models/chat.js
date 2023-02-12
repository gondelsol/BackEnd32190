const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    author: {
        id: {type: String, required: true},
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        edad: {type: Number, required: true},
        alias: {type: String, required: true},
        avatar: {type: String, required: true},
    },
    text: {type: String, required: true},
    dateTime: {type: Date, required: true, default: Date.now},
});

const chat = mongoose.model('mensajes', chatSchema);

module.exports = chat;