const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const Schema = new MongooseSchema({
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

module.exports = mongoose.model('Schema', Schema);