// Dependencies
var purshase = require('./../controllers/purshaseController');

var purshasesRoutes = function (server, middleware){

    var purshaseRouter = server.Router();

        // Purshes routes definitions
        purshaseRouter.route('/')
            // Buy a product action
            .post(middleware.checkLoggedIn, purshase.buyProduct);

    return purshaseRouter;
};

// Exporting module
module.exports = purshasesRoutes;
