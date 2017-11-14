// Dependencies
var mongoose        = require('mongoose'),
    Products        = require('./../models/productModel'),
    ProductsHistory = require('./../models/productHistoryModel');


// Getting all products 
exports.findAllProducts = function (request, response) {
    var filter = {};
    // if filter name added in query then filtering
    if (request.query.name) {
        filter.name = new RegExp(request.query.name, 'i');
    }
    // Filter when want to get only active or deleted products
    if (request.query.status) {
        filter.status = request.query.status;
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
                userId : resp.decoded.userId
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


// Updating products
exports.updateProduct = function (request, response){
    // Getting product by its identifier
    Products.findById( request.body.id, function( error, product ) {
        if ( error ){
            response.status(500).send(error);
        } else {
            // Updating amount if is coming
            if (request.body.amount) {
                product.set({amount : request.body.amount})
            // Updating price if is coming in request
            } else if (request.body.price) {
                product.set({price : request.body.price})
            }
            // Updating entry in database
            product.save( function (err, updatedProd) {
                if (err) {
                    // sending error if exists
                    response.status(500).send(err);
                } else {
                    // Creating a new record for the product history
                    var prodHistory = new ProductsHistory ({
                        productId: updatedProd._id,
                        amount: updatedProd.amount,
                        price: updatedProd.price,
                        userId : response.decoded.userId
                    });
                    // Storing in the history table the change made
                    prodHistory.save(function(historyError){
                        if (historyError){
                            response.status(500).send(historyError);
                        } else {
                            // returning back the updated product
                            response.status(201).send(updatedProd);
                        }
                    });
                }
            });
        }
    });
};
