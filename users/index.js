var express = require('express');
module.exports = app = express();
var model       = require('./models'),
    controller = require('./controllers');

app.get('/:id', controller.readUser)

app.post('/', controller.createUser)