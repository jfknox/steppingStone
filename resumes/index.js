//require express routing, and path
//require path module contains several helper functions to help make path manipulation easier
var express = require('express'),
    busboy           = require('connect-busboy'),
    path         = require('path');
module.exports = app = express();

app.use(busboy());

//require the user controller to access the functions
var controller = require('./controller');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//get requests for the render functions of the index and show page
app.get('/index.html', controller.getResumeIndexTemplate);
app.get('/show.html', controller.getResumeShowTemplate);

//on the home resume directory 
app.route('/').
//get request on resume home to get all of the resumes with function defined in controller
get(controller.getAllResumes).
//post request on resume home to post a new resume with function defined in controller
post(controller.createResume);


//send requests to specific id of resumes
//a get request that calls get resume from resume controller
//a put request that calls put resume from resume controller
//a delete request that calls delete resume from resume controller
app.route('/:id').
get(controller.getResume).
put(controller.updateResume).
delete(controller.deleteResume);





