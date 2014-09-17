var express          = require('express'),
    path             = require('path'),
    http             = require('http'),
    session          = require('express-session'),
    app              = express(),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    cookieParser     = require('cookie-parser'),
    LinkedInStrategy = require('passport-linkedin').Strategy,
    User             = require('./users/models'),
    mongoose         = require('mongoose');

//Setup ip/port/domains for localhost or openshift
var ip  = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var internal_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var external_port = process.env.OPENSHIFT_NODEJS_PORT ? '' : (':' + internal_port);
var domain = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_NODEJS_PORT ? "steppingstone-schoolofdevs.rhcloud.com" : "localhost";

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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var LINKEDIN_API_KEY = "75qkg18qrbqlkq";
var LINKEDIN_SECRET_KEY = "S31fgUjalKvL7DCs";

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://" + domain + external_port + "/auth/linkedin/callback"
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

app.use(function(req, res, next) {
  //If user signed in, save it to cookies so angular knows whats up
  if(req.user) {
    res.cookie('userId', req.user._id)
  } else {
    res.clearCookie('userId')
  }

  //Continue on
  next();
});

var layout = require('./layouts'),
    home = require('./home'),
    user = require('./users'),
    resumes = require('./resumes'),
    comments = require('./comments'),
    auth = require('./auth');


app.use(layout);
app.use('/home', home);
app.use('/resumes', resumes);
app.use('/users', user);
app.use('/auth', auth);
app.use('/comments', comments);

module.exports = http.createServer(app).listen(internal_port, ip);
