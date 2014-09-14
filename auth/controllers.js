exports.linkedInCallback = function(req, res) {
  res.redirect('/');
}

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
}