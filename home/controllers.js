//route to render the home page
exports.getHomePage = function(req, res) {
	res.render('index', { title: 'Home page' });
}