var express = require('express');
module.exports = app = express();
var passport = require('passport');
var controller = require('./controllers');


app.get('/linkedin', passport.authenticate('linkedin'));

app.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  controller.linkedInCallback);

app.get('/signout', controller.signout)