const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const LipaNaMPesaSchema = new MongooseSchema({
    phoneNumber: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    accountReference: {
        type: String,
        required: true
    },
    MerchantRequestID: {
        type: String,
        required: true
    },
    CheckoutRequestID: {
        type: String,
        required: true
    },
    ResponseCode: {
        type: Number,
        required: true
    },
    ResponseDescription: {
        type: String,
        required: true
    },
    CustomerMessage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('LipaNaMPesaSchema', LipaNaMPesaSchema);