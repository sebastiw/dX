module.exports.ensureAuthenticated = function (req, res, next) {
  if( req.isAuthenticated() ) {
    next();
    return;
  }
  res.redirect('/');
};

module.exports.notfound = function(req, res) {
  res.render('404', {title: 'Page Not Found'});
};
