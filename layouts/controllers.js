exports.getMasterLayout = function(req, res) {
	res.render('layout', { title: 'Stepping Stone', user: req.user });
}