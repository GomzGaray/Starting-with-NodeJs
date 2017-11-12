// Dependencies
var products = require('./../controllers/productsController');

// Routes definition for all products request
var productRoutes = function (server) {
    // Router creation
    var productRouter = server.Router();

    // Products routes definitions
    productRouter.route('/')
        // Get All products
        .get(products.findAllProducts);

    return productRouter;
};

// Exporting module
module.exports = productRoutes;
