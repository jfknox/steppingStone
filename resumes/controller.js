var Resume = require('./models');

exports.getAllResumes = function(req, res) {
	//Get all resumes
	if(req.query.userId) {
		Resume.find({userId: req.query.userId}, function (err, resumes) {
			if (err) {
	     	    console.log(err);
		  	    res.status(500).end();
   		    } else {
			  	res.send(resumes).end();
			}
		});
	} else{
		Resume.find(function (err, resumes) {
			if (err) {
	     	    console.log(err);
		  	    res.status(500).end();
   		    } else {
			  	res.send(resumes).end();
			}
		});
	}
}

exports.getResumeIndexTemplate = function(req, res) {
	res.render('index', { title: 'Resume Index', user: req.user});
}

exports.getResumeShowTemplate = function (req, res) {
	res.render('show', {title: "Show Resume", user: req.user});
}

exports.createResume = function (req,res) {
	if (req.user) {

		var description = req.param('description');
		var industry = req.param('industry');
		var resumeText = req.param('resumeText');
		var date = new Date();
		var userId = req.user._id;
		var userName = req.user.name;
		//Create new resume by following the schema we created in the model
		var newResume = new Resume({
			description: description, 
			industry: industry, 
			resumeText: resumeText, 
			date: date,
			userId: userId, 
			userName: userName
		});
		//Now save the newly created resume
		newResume.save(function(err) {
			//if theres an error saving, notify the resume
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				//Otherwise, redirect to the new resume's show page
				res.send(newResume).end();
			}
		});
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}

exports.getResume = function (req,res) {
	Resume.findById(req.params.id, function(err, resume) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.send(resume).end();
		}
	});
}

exports.updateResume = function (req,res) {
	if (req.user) {
		var description = req.param('description')
		var industry = req.param('industry')
		var resumeText = req.param('resumeText')

		Resume.findOneAndUpdate({
			userId: req.user._id,
			_id: req.params.id
		}, {
			description: description,
			industry: industry,
			resumeText: resumeText
		}, function(err, resume) {
			//if theres an error saving, notify the resume
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				//Otherwise, send the new resume object
				res.send(resume).end();
			}
		});
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}

exports.deleteResume = function (req,res) {
	if (req.user) {
		Resume.findOneAndRemove({
			userId: req.user._id,
			_id: req.params.id
		}, function(err, resume) {
			//if theres an error deleting, notify the resume
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				//Otherwise, send the deleted resume
				res.send(resume).end();
			}
		});
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}


