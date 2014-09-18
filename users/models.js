//require mongoose and assign it to UserSchema through mongoose.
//require a module called find or create that was made for mongoose
var mongoose     = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema       = mongoose.Schema;

//define the user schema
var UserSchema   = new Schema({
	name: String,
	linkedinId: String,
	linkedInUrl: String
});

//get access to findOrCreate
UserSchema.plugin(findOrCreate);

//export user schema for mongoose. 
module.exports = mongoose.model('User', UserSchema);