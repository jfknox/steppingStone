//require express routing, and path
//require path module contains several helper functions to help make path manipulation easier
var express = require('express'),
    path         = require('path');
module.exports = app = express();

//require the user controller to access the functions
var controller = require('./controllers');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//have a get request sent to users/profile with the getProfile function
app.get('/profile.html', controller.getProfile);




