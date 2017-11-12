// Dependencies
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Creating users schema
var usersModel = new Schema({
    name     : { type: String, required: true },
    email    : { type: String, required: true },
    password : { type: String, required: true },
    isAdmin  : { type: Boolean, default: false },
    status   : { type: String, enum: ['Active','Deleted'], default: 'Active' }
});

// Exporting UsersModel definition
module.exports = mongoose.model('users', usersModel);
