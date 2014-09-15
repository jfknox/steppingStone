var User = require('./models');

exports.getAllUsers = function(req, res) {
	//Get all users
	User.find(function (err, users) {
	  if (err) {
	  	console.log(err);
	  	res.status(500).end();
	  } else {
	  	res.send(users).end();
	  }
	});
}

exports.getUserIndex = function(req, res) {
	res.render('index', { title: 'User Index' });
}

exports.readUser = function (req,res) {
	User.findById(req.params.id, function(err, person) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.send(person).end();
		}
	});
}	