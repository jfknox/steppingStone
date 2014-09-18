//require express routing, and path
//require path module contains several helper functions to help make path manipulation easier
var express = require('express'),
    path         = require('path');
module.exports = app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//require the layout controller
var controller = require('./controllers');

//get the layout controller
app.get('/', controller.getMasterLayout)