// Dependencies
var mongoose = require('mongoose');

// Products model
var Products = require('./../models/productModel');

// Getting all products 
exports.findAllProducts = function (request, response) {
    var filter = {};
    // if filter name added in query then filtering
    if (request.query.name) {
        filter.name = new RegExp(request.query.name, 'i');
    }

    // Searching in db and passing filter if exists
    Products.find(filter, function (error, prods) {
        if (!error) {
            response.json(prods);
        } else {
            response.status(500).send(error);
        }
    });
};