var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ResumeSchema   = new Schema({
	description: String,
	industry: String,
	resumeText: String,
	date: Date,
	userId: String, 
	userName: String, 
	linkedInUrl: String

});

module.exports = mongoose.model('Resume', ResumeSchema);