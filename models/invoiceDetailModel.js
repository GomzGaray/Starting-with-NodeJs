// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating invoiceDetail schema
var invoiceDetailsModel = new Schema({
    invoiceId: { type: String, required: true },
    productId: { type: String, required: true },
    amount: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
});

// Exporting InvoiceDetailModel definition
module.exports = mongoose.model('invoiceDetail', invoiceDetailsModel);
