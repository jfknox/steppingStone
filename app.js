var express      = require('express'),
    path         = require('path'),
    http         = require('http'),
    app          = express(),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    port    = 3000;

//Get mongoose library
var mongoose = require('mongoose');
// Connect to remote mongo database hosted on monogolab.com
//remember to put in mongo db lab account info
mongoose.connect('mongodb://School_of_Devs:jeremy@ds033740.mongolab.com:33740/stepping_stone_sod');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var home = require('./home'),
    user = require('./users')
    //resumes = require('./resumes'), 
    //comments= require('./comments'), 
    //auth    = require('./auth');

app.use(home);
app.use('/users', user);
//app.use('/auth', auth);
//app.use('/resumes', resumes);
//app.use('/comments', comments);



module.exports = http.createServer(app).listen(port);