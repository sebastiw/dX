module.exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if( req.isAuthenticated() ) {
    return next();
  }
  res.redirect('/');
};

module.exports.notfound = function(req, res) {
  res.render('404', {title: 'Page Not Found'});
};
