// Module dependencies
var express  = require('express'),
    mongoose = require('mongoose');

// Server creation
var app = express();

// Setting environment port or setting one by default
var port = process.env.PORT || 3000;

// Retrieving all product routes as a function
productRoutes = require('./routes/productRoutes')(express);

// Setting up API endpoints
app.use('/api/Products', productRoutes);

// Home page
app.get('/', function(request, response){
    response.send('Welcome!!');
});

// Creating connection with database
var mongoDb = mongoose.connect('mongodb://localhost/computershop', { useMongoClient: true, }, function (dberror){
    // Checking if error ocurred connecting to db
    if( dberror ){
        console.log('Could not establish a database connection: ' + dberror);
    } else {
        // Starting server if conencted to database
        app.listen(port, function(){
            console.log("Running in port " + port);
        });
    }
});
