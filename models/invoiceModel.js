// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating invoice schema
var invoiceModel = new Schema({
    createdDate: { type: Date, required : true, default: Date.now() },
    clientId: { type: String, required: true },
    total: { type: Number, required: true }
});

// Exporting ProductModel definition
module.exports = mongoose.model('invoice', invoiceModel);