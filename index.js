var express = require('express'),
    http    = http('http'),
    app     = express();

var user    = require('./users'),
    resumes = require('./resumes'), 
    comments= require('./comments'), 
    auth    = require('./auth');

app.use(auth);
app.use(user);
app.use(resumes);
app.use(comments);




http.createServer(app).listen(8080);
