var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	description: String,
	industry: String,
	resumeText: String,
	date: Date,
	userId: String, 
	userName: String

});

module.exports = mongoose.model('Resume', UserSchema);