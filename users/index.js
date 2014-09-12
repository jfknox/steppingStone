var express = require('express');
module.exports = app = express();

var controller = require('./controllers');

app.route('/')
.get(controller.getAllUsers)
.post(controller.createUser);

app.route('/:id')
.get(controller.readUser)
.put(controller.updateUser)
.delete(controller.deleteUser);