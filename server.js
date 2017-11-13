// Module dependencies
var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser');


// Getting config file
var config = require('./config');
// Getting middleware
var middleware = require('./services/middleware');

// Server creation
var app = express();

// Setting environment port or setting one by default
var port = process.env.PORT || 3000;

// Secret value used to check tokens
app.set('superSecret', config.csToken);

// using body parser to easy json handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Retrieving all product routes as a function
productRoutes = require('./routes/productRoutes')(express, middleware);
// Routes for users management
userRoutes = require('./routes/usersRoutes')(express, middleware);

// Setting up API endpoints
app.use('/api/Products', productRoutes);

app.use('/auth', userRoutes);

// Home page
app.get('/', function(request, response){
    response.send('Welcome!!');
});

// Creating connection with database
var mongoDb = mongoose.connect(config.database, { useMongoClient: true, }, function (dberror){
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
