// Dependencies
var mongoose      = require('mongoose'),
    Products      = require('./../models/productModel'),
    Invoice       = require('./../models/invoiceModel'),
    InvoiceDetail = require('./../models/invoiceDetailModel');

// method to buy a product
exports.buyProduct = function (request, response) {
    // creating a new invoice
    var bill = new Invoice({
        clientId : response.decoded.userId,
        total : request.body.total
    })
    // saving invoice
    bill.save( function (error) {
        if(error){
            errorResponse(response, 'error saving data :' + error);
        } else {
            request.body.details.forEach(function(prod){
                // Saving details entry per product
                var detail = new InvoiceDetail({
                    invoiceId : bill._id,
                    productId : prod.productId,
                    amount    : prod.amount,
                    unitPrice : prod.price
                });
                // Saving detail
                detail.save(function(err){
                    if(err){
                        return errorResponse(response, 'error saving data :' + err)
                    } else {
                        // If detail is stored then updating amount on product
                        Products.findById( detail.productId, function( findError, product ) {
                            if ( findError ){
                                return errorResponse(response, findError);
                            } else {
                                // Calculating new amount for product
                                var newAmount = product.amount - detail.amount;
                                product.set({amount : newAmount});
                                // Updating product with remaining amount available
                                product.save( function (updateError, updatedProd) {
                                    if ( updateError ){
                                        return errorResponse(response, updateError);
                                    } else {
                                        // Returning success response when operation worked
                                        return response.status(201).json({
                                            success : true,
                                            message : 'process successfully'
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
};


var errorResponse = function (response, message){
    return response.status(500).json({
        success : false,
        message : message
    });
};
