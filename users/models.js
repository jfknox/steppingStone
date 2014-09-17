var mongoose     = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name: String,
	linkedinId: String,
	linkedInUrl: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);