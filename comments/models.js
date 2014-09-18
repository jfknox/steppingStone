//require mongoose and assign it to CommentSchema through mongoose.
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//create schema and give jey and value pairs
var CommentSchema   = new Schema({
	content: String,
	date: Date,
	userId: String, 
	userName: String, 
	resumeId: String,
	linkedInUrl: String

});

//exports the comment schemma to be picked up by mongoose
module.exports = mongoose.model('Comment', CommentSchema);

