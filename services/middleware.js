var jwt    = require('jsonwebtoken'),
    config = require('./../config');

exports.checkLoggedIn = function (request, response, next){
    var token = tokenFound(request);
    if ( !token ) {
        // Returning when no token has been provided
        return forbiddenMessage(response, 'No token provided');
    } else {
        jwt.verify(token, config.csToken, function (error, decoded){
            if (error){
                // Returning when token is invalid
                return forbiddenMessage(response, 'Failed to authenticate token. Try login again');
            } else {
                response.decoded = decoded;
                next();
            }
        })
    }
};

exports.checkIsAdmin = function (request, response, next){
    var token = tokenFound(request);
    if ( !token ) {
        // Returning when no token has been provided
        return forbiddenMessage(response, 'No token provided');
    } else {
        jwt.verify(token, config.csToken, function (error, decoded){
            if (error) {
                // Returning when token is invalid
                return forbiddenMessage(response, 'Failed to authenticate token. Try login again');
            } else {
                if( !decoded.isAdmin ){
                    // Returning not enough permissions
                    return forbiddenMessage(response, 'Unauthorized to process request');
                } else {
                    response.decoded = decoded;
                    next();
                }
            }
        })
    }
};

// Function to get and return token if exists
var tokenFound = function (request){
    return request.body.token || request.query.token || request.headers['x-access-token'];
}

// Function to return forbidden message response
var forbiddenMessage = function (response, message){
    return response.status(403).send({
        success : false,
        message : message
    });
}
