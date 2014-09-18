//require both the resume and comment models
var Resume = require('./models');
var Comment = require('./../comments/models');
var fs      = require('fs');

//export get all resume function
exports.getAllResumes = function(req, res) {
	//if pass a user id then get all resumes for that id 
	if(req.query.userId) {
		//find all ids with the specified user id
		Resume.find({userId: req.query.userId}, function (err, resumes) {
			//an error happens then log error
			if (err) {
	     	    console.log(err);
		  	    res.status(500).end();
		  	//respond by sending all of the resumes
   		    } else {
			  	res.send(resumes).end();
			}
		});
	} else{
		//
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
		var date = new Date();
		var userId = req.user._id;
		var userName = req.user.name;
		var linkedInUrl = req.user.linkedInUrl;
		//Create new resume by following the schema we created in the model
		var newResume = new Resume({
			description: description, 
			industry: industry,
			date: date,
			userId: userId, 
			userName: userName,
			linkedInUrl: linkedInUrl
		});
		//Now save the newly created resume
		newResume.save(function(err) {
			//if theres an error saving, notify the resume
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				var fstream;
			    req.pipe(req.busboy);
			    req.busboy.on('file', function (fieldname, file, filename) {
					var rootPath = process.env.OPENSHIFT_DATA_DIR || (__dirname + '/../files/');
					var path = newResume._id + '_' + filename;

			        console.log("Uploading: " + filename);
			        console.log("Save to: " + path);
			        fstream = fs.createWriteStream(rootPath + path);
			        file.pipe(fstream);
			        fstream.on('close', function () {
			        	newResume.resumeText = 'files/' + path;
			        	newResume.save(function(err) {
			        		if(err) {
			        			console.log(err)
			        			res.status(500).end();
			        		} else {
								res.send(newResume).end();
			        		}
			        	})
			        });
			    });
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
		console.log('delete resume enter')
		Resume.findOneAndRemove({
			userId: req.user._id,
			_id: req.params.id
		}, function(err, resume) {
			console.log('delete resume callback')
			//if theres an error deleting, notify the resume
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				//Otherwise, send the deleted resume
				Comment.remove({ resumeId: req.params.id}, function (err) {
					console.log('delete comments callback')
					if(err) {
						console.log(err);
						res.status(500).end();
					} else {
						res.send(resume).end();
					}
				});
			}
		});
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}


