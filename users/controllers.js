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

exports.createUser = function (req,res) {
	var username = req.param('username')
	var email = req.param('email')
	var password = req.param('password')

	//Create new user by following the schema we created in the model
	var newuser = new User({ username: username, email: email, password: password })
	
	//Now save the newly created user
	newuser.save(function(err) {
		//if theres an error saving, notify the user
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			//Otherwise, redirect to the new user's show page
			res.send(newuser).end();
		}
	});
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

exports.updateUser = function (req,res) {
	var userid = req.params.id;
	var username = req.param('username');
	var email = req.param('email');
	var password = req.param('password');

	User.findByIdAndUpdate(userid, { username: username, email: email, password: password }, function(err, user) {
		//if theres an error saving, notify the user
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			//Otherwise, send the new user object
			res.send(user).end();
		}
	});

}

exports.deleteUser = function (req,res) {
	User.findByIdAndRemove(req.params.id, function(err, person) {
		//if theres an error deleting, notify the user
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			//Otherwise, send the deleted user
			res.send(user).end();
		}
	});
}