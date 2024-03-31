const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },
    phoneno: {
        type: Number,
        required: [true, 'phone no cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'email no cannot be empty']
    }

})




module.exports = mongoose.model('User', userSchema);

