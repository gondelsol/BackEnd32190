const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    dateTime: {type: Date, required: true, default: Date.now},
});
productSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const product = mongoose.model('product', productSchema);

module.exports = product;