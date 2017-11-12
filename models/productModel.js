// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating product schema
var productModel = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['Active','Deleted'], default: 'Active' }
});

// Exporting ProductModel definition
module.exports = mongoose.model('product', productModel);