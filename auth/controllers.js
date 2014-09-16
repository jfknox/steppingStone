exports.linkedInCallback = function(req, res) {
  //on successful login, redirect to homepage
  res.redirect('/#/resumes');
}

exports.signout = function(req, res) {
  //on logout redirect to homepage
  req.logout();
  res.redirect('/');
}