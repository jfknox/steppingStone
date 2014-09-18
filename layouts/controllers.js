
//export out the get function that renders the layout.jade file
exports.getMasterLayout = function(req, res) {
	res.render('layout', { title: 'Stepping Stone', user: req.user });
}

