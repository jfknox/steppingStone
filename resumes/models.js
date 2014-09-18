//require mongoose and assign it to resumeSchema through mongoose.
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//define the resume schema
var ResumeSchema   = new Schema({
	description: String,
	industry: String,
	resumeText: String,
	date: Date,
	userId: String, 
	userName: String, 
	linkedInUrl: String

});

//eports resume model for mongoose
module.exports = mongoose.model('Resume', ResumeSchema);