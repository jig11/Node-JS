const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:'This field is required.',
        unique: true,
    },
    password:{
        type:String,
        required:'This field is required.'
    }
});
const user = mongoose.model('User',userSchema);
module.exports = user; 