const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true },
    dateTime: {type: Date, required: true, default: Date.now},
});
userSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}

//helpful functions: encrypt password
// userSchema.pre("save", function(next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

//helpful functions: compare passwords
userSchema.methods.comparePassword = (password, hash) => {
    let comp = bcrypt.compareSync(password, hash)
    return comp;
}

const user = mongoose.model('users', userSchema);

module.exports = user;