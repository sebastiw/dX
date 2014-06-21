var User = require( '../../schema/user.js' );

module.exports.getMembers = function (req, callback) {
  User.find().sort({ year: -1 }).exec( callback );
};

module.exports.newMember = function (req, callback) {
  var user = new User( {
    username: req.param("username"),
    year: req.param("year"),
    position: req.param("position"),
    email: req.param("email")
  } );

  user.save( function(err, user) {
    callback(err, user);
  } );
};

module.exports.resetPassword = function (req, callback) {
  User.findOne( {
    _id: req.param("id")
  }, function (err, user) {
    user.resetPassword(callback);
  } );
};

module.exports.changePassword = function (req, callback) {
  User.findOne( {
    _id: req.param("id")
  }, function (err, user) {
    if( err ) {
      callback(err, null);
      return;
    }
    user.setPassword(req.param("password"), callback);
  } );
};
