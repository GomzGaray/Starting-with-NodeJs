// Dependencies
var mongoose = require('mongoose'),
    Likes = require('./../models/likingModel');

exports.likeUnlikeProduct = function(request, response){
    Likes.findOne({
        productId : request.body.productId,
        userId : response.decoded.userId
    }, function (error, likeFound){
        if (error){
            response.status(500).send({ success : false, message : error });
        } else if (likeFound) {
            if(likeFound.status == 'Liked'){
                likeFound.set({status : 'Unliked'});
            } else {
                likeFound.set({status : 'Liked'});
            }
            likeFound.save(function (err){
                if (err){
                    response.status(500).send({ success : false, message : error });
                } else {
                    response.status(201).send({ success : true, message: likeFound.status });
                }
            });
        } else {
            var newLike = new Likes({
                productId : request.body.productId,
                userId : response.decoded.userId
            });
            newLike.save(function(error){
                if (error){
                    response.status(500).send({ success : false, message : error });
                } else {
                    response.status(201).send({ success : true, message: 'liked' });
                }
            })
        }
    });
};

exports.likesNumberByProduct = function(request, response){
    Likes.count({productId : request.params.productId},function (err, likes){
        if (err){
            response.status(500).send({ success : false, message : err });
        } else {
            response.status(201).send({ success : false, message : likes });
        }
    });
};
