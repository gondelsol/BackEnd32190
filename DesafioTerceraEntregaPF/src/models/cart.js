const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: {type: Array, required: true, default: []},
    dateTime: {type: Date, required: true, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
});
cartSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const cart = mongoose.model('cart', cartSchema);

module.exports = cart;