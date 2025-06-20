const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    description:{
        type:String,
        required:'This field is required.'
    },
    amount:{
        type:String
    }
});
const Payments = mongoose.model('Payment',paymentSchema);
module.exports = Payments; 