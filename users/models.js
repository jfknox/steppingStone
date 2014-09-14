var mongoose     = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	username: String,
	email: String,
	password: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);