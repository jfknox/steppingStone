//assign variable User to the user models page 
var User = require('./models');
//exports the get profile function
exports.getProfile = function(req, res) {
	//respond by rendering the profile.jade document and require the user to have access in angular
	res.render('profile', { title: 'User Profile', user: req.user });
}

	