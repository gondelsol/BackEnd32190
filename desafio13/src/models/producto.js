const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    dateTime: {type: Date, required: true, default: Date.now},
});
productoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const producto = mongoose.model('productos', productoSchema);

module.exports = producto;