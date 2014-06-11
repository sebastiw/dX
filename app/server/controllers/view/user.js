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
      res.redirect('/');
      return;
    }
    req.logIn(user, function(err) {
      if ( err ) {
        next(err);
        return;
      }
      res.redirect('/home');
      return;
    });
  })(req, res, next);
};
