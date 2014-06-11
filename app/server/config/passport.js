var mongoose      = require( 'mongoose' ),
    LocalStrategy = require( 'passport-local' ).Strategy,
    User          = require( '../schema/user.js' );

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser(
    function (user, callback) {
      callback(null, user.id);
    });

  passport.deserializeUser(
    function (id, callback) {
      User.findOne({
        _id: id
      }, function (err, user) {
        callback(err, user);
      });
    });

  // use local strategy
  passport.use(new LocalStrategy(
    // {
    //   usernameField: 'username', // POST-fields
    //   passwordField: 'password'  // POST-fields
    // },
    function (username, password, callback) {
      User.authenticate(username, password, function(err, user) {
        return callback(err, user);
      });
    }));
};
