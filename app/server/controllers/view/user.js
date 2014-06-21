var passport = require( 'passport' );

module.exports.attemptlogin = function(req, res) {
  if ( !req.isAuthenticated() ) {
    res.render('index', { title: 'dX' });
  } else{
    // attempt automatic login
    res.redirect('/home');
  }
};

module.exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if ( err ) {
      next(err);
      return;
    }
    if ( !user ) {
      res.send({ success: false });
      return;
    }
    req.login(user, function(err) {
      if (err) {
        next(err);
        return;
      }
      res.send({ success: true });
      return;
    });
  })(req, res, next);
};

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports.settings = function (req, res) {
  res.render('settings');
};
