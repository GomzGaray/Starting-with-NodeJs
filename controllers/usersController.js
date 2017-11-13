// Dependencies
var mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      jwt    = require('jsonwebtoken');

// Products model
var Users = require('./../models/usersModel');
// Getting config file
var config = require('./../config');

var salt = bcrypt.genSaltSync(10);

// SignUp
exports.signUp = function (request, response) {

    if (!request.body.email){
        return response.status(500).json({
            success : false,
            message : 'email is required'
        });
    } else if ( !request.body.password ){
        return response.status(500).json({
            success : false,
            message : 'password is required'
        });
    } else if ( !request.body.name ){
        return response.status(500).json({
            success : false,
            message : 'name is required'
        });
    }

    // password encryption
    var hashedPass = bcrypt.hashSync(request.body.password, salt);

    // Storing user
    var user = new Users(request.body);
    user.password = hashedPass;
    user.save(function(error){
        if (error){
            console.log(error);
            return response.status(500).json({
                success : false,
                message : 'error registering user: ' + error.errmsg
            });
        } else {
            return response.status(201).json({
                success : true,
                message : 'user registered successfully'
            });
        }
    });
};


// SignIn
exports.signIn = function (request, response) {
    // Searching for current user by email
    Users.findOne({
        email : request.body.email
    }, function(err, user) {
        if (err){
            return response.status(500).json({ success : false, message : 'internal error' + err });
        } else if ( !user ) {
            // Sending message when user is not found
            return response.status(401).json({ success : false, message : 'user not found'});
        } else {
            // Checking if passwords match
            if( bcrypt.compareSync(request.body.password, user.password) ){
                // Creating payload
                var payload = { isAdmin : user.isAdmin, userId : user._id };
                // Creating token
                var token = jwt.sign(payload, config.csToken, {
                    expiresIn : 18000 // expires in 5 hours
                });
                return response.status(200).json({success : true, message:'Authorized', token : token});
            } else {
                return response.status(401).json({success : false, message:'Invalid credentials'});
            }
        }
    });
};
