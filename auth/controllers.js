//export out linkedin callback function to login
exports.linkedInCallback = function(req, res) {
  //on successful login, redirect to homepage
  res.redirect('/#/resumes');
}
//logout function with redirect to home page. 
exports.signout = function(req, res) {
  //on logout redirect to homepage
  req.logout();
  res.redirect('/');
}