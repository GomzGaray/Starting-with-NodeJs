// Module dependencies
var express = require('express');

// Server creation
var app = express();

// Setting environment port or setting one by default
var port = process.env.PORT || 3000;

// Home page
app.get('/', function(request, response){
    response.send('Welcome!!');
});

// Starting server
app.listen(port, function(){
    console.log("Running in port " + port);
});