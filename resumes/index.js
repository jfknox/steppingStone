var express = require('express'),
    path         = require('path');
module.exports = app = express();

var controller = require('./controller');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/index.html', controller.getResumeIndexTemplate);
app.get('/show.html', controller.getResumeShowTemplate);

app.route('/').
get(controller.getAllResumes).
post(controller.createResume);

app.route('/:id').
get(controller.getResume).
put(controller.updateResume).
delete(controller.deleteResume);



