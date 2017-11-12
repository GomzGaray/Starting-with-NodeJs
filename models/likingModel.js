// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating liking schema
var likingModel = new Schema({
    productId : { type: String, required: true },
    userId    : { type: String, required: true },
    likedDate : { type: String, required: true },
    status    : { type: String, enum: ['Liked','Unliked']}
});

// Exporting LikingModel definition
module.exports = mongoose.model('liking', likingModel);
