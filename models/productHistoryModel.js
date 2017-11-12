// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating product history schema
var productHistoryModel = new Schema({
    productId: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    createdDate : {type : Date , default : Date.now()},
    userId : {type: String, required: true}
});

// Exporting ProductHistoryModel definition
module.exports = mongoose.model('productHistory', productHistoryModel);
