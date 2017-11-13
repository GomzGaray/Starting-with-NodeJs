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


// Get product by Identifier
exports.findProductById = function (req, resp) {
    Products.findById( req.params.id, function( err, prod ) {
        if (err){
            resp.status(500).send(err);
        } else if( prod ) {
            return resp.send( prod );
        } else {
            resp.status(404).send('Product not found');
        }
    });
};


// Add a new product
exports.addProduct = function (req, resp) {
    var product = new Products(req.body);
    product.save( function (error){
        if (error){
            resp.status(500).send(error);
        } else {
            resp.status(201).send(product);
        }
    });
};


// Get product by Identifier
exports.removeProductById = function (req, resp) {
    Products.findById( req.params.id, function( err, prod ) {
        if (err){
            resp.status(500).send(err);
        } else if( prod ) {
            prod.status = 'Deleted'
            prod.save( function (error) {
                if(error){
                    resp.status(500).send('error removing' + error);
                } else {
                    resp.status(200).send(prod);
                }
            })
            return resp.send( prod );
        } else {
            resp.status(404).send('Product not found');
        }
    });
};
