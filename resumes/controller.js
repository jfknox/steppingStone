var Resume = require('./models');

exports.getAllResumes = function(req, res) {
	//Get all resumes
	Resume.find(function (err, resumes) {
	  if (err) {
	  	console.log(err);
	  	res.status(500).end();
	  } else {
	  	res.send(resumes).end();
	  }
	});
}

exports.getResumeIndexTemplate = function(req, res) {
	res.render('index', { title: 'Resume Index' });
}

exports.getResumeShowTemplate = function (req, res) {
	res.render('show', {title: "Show Resume"});
}

exports.createResumes = function (req,res) {

	var description = req.param('description')
	var industry = req.param('industry')
	var resumeText = req.param('resumeText')
	var date = new Date()


	//Create new resume by following the schema we created in the model
	var newResume = new Resume({ description: description, industry: industry, resumeText: resumeText, date: date})
	
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

exports.readResumes = function (req,res) {
	Resume.findById(req.params.id, function(err, person) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.send(person).end();
		}
	});
}

exports.updateResumes = function (req,res) {
	var description = req.param('description')
	var industry = req.param('industry')
	var resumeText = req.param('resumeText')

	Resume.findByIdAndUpdate(req.params.id, { description: description, industry: industry, resumeText: resumeText }, function(err, resume) {
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

exports.deleteResumes = function (req,res) {
	Resume.findByIdAndRemove(req.params.id, function(err, person) {
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