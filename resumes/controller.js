//require both the resume and comment models
var Resume = require('./models');
var Comment = require('./../comments/models');
var fs      = require('fs');

//export get all resume function
exports.getAllResumes = function(req, res) {
	//if passed a user id in the request object then get all resumes for that id 
	if(req.query.userId) {
		//find all ids with the specified user id
		Resume.find({userId: req.query.userId}, function (err, resumes) {
			//an error happens then log error
			if (err) {
	     	    console.log(err);
		  	    res.status(500).end();
		  	//respond by sending all of the resumes
   		    } else {
   		    	//send resumes to angular
			  	res.send(resumes).end();
			}
		});
	} else{
		//if there isn't a user then display all of the resumes
		Resume.find(function (err, resumes) {
			if (err) {
	     	    console.log(err);
		  	    res.status(500).end();
   		    } else {
   		    	//send resumes
			  	res.send(resumes).end();
			}
		});
	}
}
//function that renders the resume index page pase the user in to have access in the index page
exports.getResumeIndexTemplate = function(req, res) {
	res.render('index', { title: 'Resume Index', user: req.user});
}
//resume that renders the resume show page
exports.getResumeShowTemplate = function (req, res) {
	res.render('show', {title: "Show Resume", user: req.user});
}

exports.createResume = function (req,res) {
	// save entry first to gain access to the resumeId for unique uploads
	if (req.user) {
		var vote_count = 0
		var date = new Date();
		var userId = req.user._id;
		var userName = req.user.name;
		var linkedInUrl = req.user.linkedInUrl;
		//Create new resume by following the schema we created in the model
		var newResume = new Resume({
			vote_count: 0,
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
				//Save the file to storage
				var fstream;
			    req.pipe(req.busboy);
			    req.busboy.on('file', function (fieldname, file, filename) {
			    	//if we are on localhost use dirname, if on openshift use OPENSHIFT for path
					var rootPath = process.env.OPENSHIFT_DATA_DIR || (__dirname + '/../files/');
					var path = newResume._id + '_' + filename;
			        console.log("Uploading: " + filename);
			        console.log("Save to: " + rootPath);
			        fstream = fs.createWriteStream(rootPath + path);
			        file.pipe(fstream);	

			        newResume.resumeText = 'files/' + path;
			    });

			    //Need to use busboy to get param fields
	    	    req.busboy.on('field', function(fieldname, val) {
	    			newResume[fieldname] = val;
	  			});

	  			//Once busboy is done, save the mongodb resume object
	    		req.busboy.on('finish', function() {
		        	newResume.save(function(err) {
		        		if(err) {
		        			console.log(err)
		        			res.status(500).end();
		        		} else {
							res.send(newResume).end();
		        		}
		        	})

	    		})
			}
		});
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}
//function to get resume
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
//req is the ajax request and what the back end recieves and response is the reply back
exports.updateResume = function (req,res) {
	if (req.user) {
		var newData = {}; //This object will contain all the new resume info need to do this for update 
		//bussboy code
		var fstream;
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	    	//If there was a file upload, save it to storage
			var rootPath = process.env.OPENSHIFT_DATA_DIR || (__dirname + '/../files/');
			var path = req.params.id + '_' + filename;
	        console.log("Uploading: " + filename);
	        console.log("Save to: " + rootPath);
	        fstream = fs.createWriteStream(rootPath + path);
	        file.pipe(fstream);

	        //Save file path to our newData object
	        newData.resumeText = 'files/' + path;
	    });

	    //Use busboy to get all the param fields
	    req.busboy.on('field', function(fieldname, val) {
	    	newData[fieldname] = val;
	    });

	    //On finish, find the resume in mongo and update its contents with the newData object
	    req.busboy.on('finish', function() {
			//find resume with the user id from the req and then find the specific resume
			Resume.findOneAndUpdate({
				userId: req.user._id,
				_id: req.params.id
			}, newData, function(err, resume) {
				//if theres an error saving, notify the resume
				if(err) {
					console.log(err);
					res.status(500).end();
				} else {
					//Otherwise, send the new resume object
					res.send(resume).end();
				}
			});
	    })
	}
	else {
		console.log("User not signed in");
		res.status(500).end();
	}
}

//delete resume 
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



exports.upVoteResume = function(req, res){
	console.log('start up vote')
	var userId = req.user._id
	var resumeId = req.params.id
	Resume.findOneAndUpdate( {_id : resumeId}, function(err, resume) {
		if (err){
			console.log('vote error')
			res.status(500).end();
		} else{
			resume.vote_count = resume.vote_count + 1
			resume.save( function(err) {
				if(err){
					console.log("vote save error")
					res.status(500).end();
				}else{
					res.send(resume).end();
				}

			})
		}
	})
}






































