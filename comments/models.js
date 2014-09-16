var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
	content: String,
	date: Date,
	userId: String, 
	userName: String, 
	resumeId: String

});

module.exports = mongoose.model('Comment', CommentSchema);

