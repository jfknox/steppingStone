var express = require('express'),
    path         = require('path');
module.exports = app = express();

var controller = require('./controllers');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/profile.html', controller.getProfile);




