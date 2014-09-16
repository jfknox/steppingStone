var Comment = require('./models');
//localhost/comments/
exports.getComments = function(req, res) {
	var userId = req.param('userId');
	var resumeId = req.param('resumeId');

	if(userId != undefined) {
		//get comments from user
		Comment.find({ userId : userId }, function(err, comments) {
			if (err) {
		  		console.log(err);
		  		res.status(500).end();
		    } else {
		  		res.send(comments).end();
	        }
		});
	} else if(resumeId != undefined) {
		//get comments from resume
		Comment.find({ resumeId : resumeId }, function(err, comments) {
			if (err) {
		  		console.log(err);
		  		res.status(500).end();
		    } else {
		  		res.send(comments).end();
	        }
		});
	} else {
		console.log('requres id')
		res.status(500).end();
	}
}

exports.createComment = function(req, res) {
	if (req.user) {
		var content = req.param('content');
		var date = new Date();
		var userId = req.user._id;
		var userName = req.user.name;
		var resumeId = req.param('resumeId');
		var anonymous = req.param('anonymous')
		//Create new resume by following the schema we created in the model
		if (anonymous) {
			userName = "Anonymous"
		}
		var newComment = new Comment({
			content: content, 
			resumeId: resumeId, 
			date: date,
			userId: userId, 
			userName: userName
		});
		//Now save the newly created resume
		newComment.save(function(err) {
			//if theres an error saving, notify the resume
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				//Otherwise, redirect to the new resume's show page
				res.send(newComment).end();
			}
		});
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}


exports.deleteComment = function (req,res) {
	if (req.user) {
		Comment.findOneAndRemove({
			userId: req.user._id,
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
		console.log("User not signed in");
		res.status(500).end();
	}
}



