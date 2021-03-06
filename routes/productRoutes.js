// Dependencies
var products = require('./../controllers/productsController');

// Routes definition for all products request
var productRoutes = function (server, middleware) {
    // Router creation
    var productRouter = server.Router();

    // Products routes definitions
    productRouter.route('/')
        // Get All products
        .get(products.findAllProducts)
        // Add a new product
        .post(middleware.checkIsAdmin, products.addProduct)
        // Update existing products
        .put(middleware.checkIsAdmin, products.updateProduct);


    // Products by identifier
    productRouter.route('/:id')
        // Get specific one
        .get(products.findProductById)
        // Removing product
        .delete(middleware.checkIsAdmin, products.removeProductById);

    return productRouter;
};

// Exporting module
module.exports = productRoutes;
