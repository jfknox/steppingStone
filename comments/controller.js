//assign variable Comment ti the comment models page 
var Comment = require('./models');
//export all of the functions to access the routes in the index page

//function to get all of the comments
exports.getComments = function(req, res) {
	//grab the userID and resume which we have access to in the schema in the models
	var userId = req.param('userId');
	var resumeId = req.param('resumeId');
	//check to see if there is a userId for the profile page 
	if(userId != undefined) {
		//get comments linked with user user
		Comment.find({ userId : userId }, function(err, comments) {
			if (err) {
				//if there is an error log a server error
		  		console.log(err);
		  		res.status(500).end();
		    } else {
		    	//display comments onto the profile page
		  		res.send(comments).end();
	        }
		});
	//check to see if there is a resumeId
	} else if(resumeId != undefined) {
		//get comments linked with resume
		Comment.find({ resumeId : resumeId }, function(err, comments) {
			//if there is an error log a server error
			if (err) {
		  		console.log(err);
		  		res.status(500).end();
		  	//else get all of the comments and post them
		    } else {
		  		res.send(comments).end();
	        }
		});
	//if there is neither a user or resume ID then return a server error.
	} else {
		console.log('requres id')
		res.status(500).end();
	}
}
//function to create a comment
exports.createComment = function(req, res) {
	//require a user to use function as security measure
	if (req.user) {
		//assign variables of all of the respective schema fields
		var content = req.param('content');
		//call the date function to get date created
		var date = new Date();
		//get user Id from mongoose and pull other user attributes the same way
		var userId = req.user._id;
		var userName = req.user.name;
		var linkedInUrl = req.user.linkedInUrl;
		//pull resume id from schema
		var resumeId = req.param('resumeId');
		//create a annonymous variable and assign it to anonymous
		var anonymous = req.param('anonymous')
		//if the username = anonymous the assignt the linked in url to ""
		if (anonymous) {
			userName = "Anonymous",
			linkedInUrl = ''
		}
		//Create new resume by following the schema we created in the model by assigning key/value pairs
		var newComment = new Comment({
			content: content, 
			resumeId: resumeId, 
			date: date,
			userId: userId, 
			userName: userName,
			linkedInUrl: linkedInUrl
		});
		//Now save the newly created comment with mongoose save function
		newComment.save(function(err) {
			if(err) {
				//if coment didn't save then log server error
				console.log(err);
				res.status(500).end();
			} else {
				//respond by sending Newcomment.save function
				res.send(newComment).end();
			}
		});
	}
	else {
		//if no user then log server error
		console.log("User not signed in");
		res.status(500).end();
	}
}

//export the deleteComment function
exports.deleteComment = function (req,res) {
	//check to see if there is a user
	if (req.user) {
		//if there isa user find the comment and remove it. 
		Comment.findOneAndRemove({
			//conditions = key value the user id and the current user id
			userId: req.user._id,
			//the key value of the comment id's and the comment in questions id
			_id: req.params.id
		}, function(err, comment) {
			//if theres an error deleting, notify the comment
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				//Otherwise, send the deleted comment 
				res.send(comment).end();
			}
		});
	}
	else {
		//if there is not a user return server error
		console.log("User not signed in");
		res.status(500).end();
	}
}



