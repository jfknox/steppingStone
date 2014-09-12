var express = require('express'),
    path         = require('path');
module.exports = app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var controller = require('./controllers');

app.route('/')
.get(controller.getHome)