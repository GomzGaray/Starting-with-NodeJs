// Dependencies
var likes = require('./../controllers/likingController');

var likesRoutes = function (server, middleware){

    var likeRouter = server.Router();
    
        // Like routes definitions
        likeRouter.route('/')
            // Getting the numebr of likes for a product
            .get(likes.likesNumberByProduct)
            // Single post to like - unlike - relike a product
            .post(middleware.checkLoggedIn, likes.likeUnlikeProduct);
    
    return likeRouter;
};

// Exporting module
module.exports = likesRoutes;