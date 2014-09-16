var express = require('express'),
path         = require('path');
module.exports = app = express();

var controller = require('./controller');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.route('/').
get(controller.getComments).
post(controller.createComment);

