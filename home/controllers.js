exports.getHome = function(req, res) {
	res.render('index', { title: 'Home page' });
}