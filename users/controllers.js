//assign variable User to the user models page 
var User = require('./models');
//exports the get profile function
exports.getProfile = function(req, res) {
	//respond by rendering the profile.jade document and require the user to have access in angular
	res.render('profile', { title: 'User Profile', user: req.user });
}

//exports get user, and send the user JSON 
exports.getUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if (err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.send(user).end();
		}

	});
}

