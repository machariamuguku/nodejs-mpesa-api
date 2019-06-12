const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const LipaNaMPesaSchema = new MongooseSchema({
    PhoneNumber: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    AccountReference: {
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
    Completness: {
        type: String,
        default: "pending"
    },
    CallbackMetadata: {
        type: Array,
        default: "pending",
        required: false
    },
    Date: {
        type: Date,
        default: Date.now()
    }
},
    { versionKey: '_versionKey' }, // changed the default version key form '_v'
    { collection: 'MpesaApi' }); // define own collection

module.exports = mongoose.model('LipaNaMPesaSchema', LipaNaMPesaSchema);