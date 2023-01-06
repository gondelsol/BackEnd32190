const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
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
// carritoSchema.methods.toJSON = function(){
//     const {__v,_id,...data} = this.toObject();
//     data.id = _id;
//     return data;
// }
const carrito = mongoose.model('mensajes', carritoSchema);



module.exports = carrito;