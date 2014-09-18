//require express routing, and path
//require passport to help with linkedin login and authentication
//require controller directory
var express = require('express');
module.exports = app = express();
var passport = require('passport');
var controller = require('./controllers');


app.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

//the redirect after linkedin login is complete
app.get('/linkedin/callback', passport.authenticate('linkedin', {
   successRedirect: '/#/resumes',
   failureRedirect: '/'
}));

app.get('/signout', controller.signout)