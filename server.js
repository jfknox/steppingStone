var express      = require('express'),
    path         = require('path'),
    http         = require('http'),
    session      = require('express-session'),
    app          = express(),
    bodyParser   = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    port    = 3000,
    LinkedInStrategy = require('passport-linkedin').Strategy,
    User = require('./users/models');

//Get mongoose library
var mongoose = require('mongoose');
// Connect to remote mongo database hosted on monogolab.com
//remember to put in mongo db lab account info
mongoose.connect('mongodb://School_of_Devs:jeremy@ds033740.mongolab.com:33740/stepping_stone_sod');

app.use(session({ secret: 'jeremy' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var LINKEDIN_API_KEY = "75qkg18qrbqlkq";
var LINKEDIN_SECRET_KEY = "S31fgUjalKvL7DCs";


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log('auth caller')
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      if(err) {
        console.log(err)
      } else {
        console.log(profile)
        user.name = profile.displayName
        user.save(function(err, user) {
          if(err) {
            console.log(err)
          } else {
            return done(err, user);
          }
        })
      }
    });
  }
));



var layout = require('./layouts'),
    home = require('./home'),
    user = require('./users'),
    resumes = require('./resumes'),
    comments= require('./comments'),
    auth= require('./auth');

app.use(layout);
app.use('/home', home);
app.use('/resumes', resumes);
app.use('/users', user);
app.use('/auth', auth);
//app.use('/comments', comments);



module.exports = http.createServer(app).listen(port);