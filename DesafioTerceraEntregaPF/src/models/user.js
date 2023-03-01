const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true, message: 'El nombre es requerido' },
    address: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    admin: { type: Boolean, required: true, default: false },
    dateTime: {type: Date, required: true, default: Date.now},
});
userSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const user = mongoose.model('user', userSchema);

module.exports = user;