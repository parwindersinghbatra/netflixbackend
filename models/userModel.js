const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true
    }
}, {timestamps: true})


const User = mongoose.model("User",userSchema);

module.exports = User