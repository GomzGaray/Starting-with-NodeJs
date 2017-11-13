// Dependencies
var mongoose = require('mongoose');

// Products model
var Products = require('./../models/productModel');
// ProductsHistory model
var ProductsHistory = require('./../models/productHistoryModel');

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
exports.findProductById = function (request, resp) {
    Products.findById( request.params.id, function( err, prod ) {
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
exports.addProduct = function (request, resp) {
    var product = new Products(request.body);
    product.save( function (error){
        if (error){
            resp.status(500).send(error);
        } else {
            var prodHistory = new ProductsHistory ({
                productId: product._id,
                amount: product.amount,
                price: product.price,
                userId : resp.decoded.userId,
            });
            prodHistory.save(function(err){
                if (err){
                    resp.status(500).send(err);
                } else {
                    resp.status(201).send(product);
                }
            });
        }
    });
};


// Get product by Identifier
exports.removeProductById = function (request, resp) {
    Products.findById( request.params.id, function( err, prod ) {
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
