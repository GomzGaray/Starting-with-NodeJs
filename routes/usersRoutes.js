//  Dependencies
var users = require('./../controllers/usersController')

// Definition of all products routes related
var userRoutes = function(server){

    // Router creation
    var userRoutes = server.Router();

    // User sign up
    userRoutes.route('/signup').post(users.signUp);
    // User login
    userRoutes.route('/login').post(users.signIn);

    return userRoutes;

}

// Sharing user routes
module.exports = userRoutes;
