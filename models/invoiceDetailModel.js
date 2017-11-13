// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating invoice schema
var invoiceDetailsModel = new Schema({
    invoiceId: { type: String, required: true },
    productId: { type: String, required: true },
    ammount: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
});

// Exporting ProductModel definition
module.exports = mongoose.model('invoiceDetail', invoiceDetailsModel);