// Dependencies
var products = require('./../controllers/productsController');

// Routes definition for all products request
var productRoutes = function (server) {
    // Router creation
    var productRouter = server.Router();

    // Products routes definitions
    productRouter.route('/')
        // Get All products
        .get(products.findAllProducts)
        // Add a new product
        .post(products.addProduct);

    // Products by identifier
    productRouter.route('/:id')
        // Get specific one
        .get(products.findProductById)
        // Removing product
        .delete(products.removeProductById);

    return productRouter;
};

// Exporting module
module.exports = productRoutes;
