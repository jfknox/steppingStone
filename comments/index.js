//require express routing, and path
//require path module contains several helper functions to help make path manipulation easier
var express = require('express'),
path         = require('path');
module.exports = app = express();

//require the comment controller
var controller = require('./controller');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes designated to the root directory of comment 
app.route('/').
//get request on comment home to get all of the comments with function defined in controller
get(controller.getComments).
//post request on comment home to post a new comment with function defined in controller
post(controller.createComment);

//route to single out specific comment and delete it with function defined in controller
app.route('/:id').
delete(controller.deleteComment);
