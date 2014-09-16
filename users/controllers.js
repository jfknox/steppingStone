var User = require('./models');

exports.getProfile = function(req, res) {

	res.render('profile', { title: 'User Profile', user: req.user });
}

	