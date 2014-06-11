var mongoose  = require( 'mongoose' ),
    Schema    = mongoose.Schema,
    bcrypt    = require( 'bcrypt' ),
    validator = require( 'validator' );

var UserSchema = new Schema( {
  username:  {type: String, validator: validator.isAlpha, lowercase: true},
  password: {
    hash: String,
    salt: String
  },
  year:      {type: Number, min: 1983},
  lastlogin: {type: Date, validator: validator.isDate}
} );


/**
 * Changes the password for a user
 * @param {String} password
 * @param {Fn} callback
 */
UserSchema.methods.setPassword = function (password, callback) {
  var that = this;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if(!err && hash) {
        that.password = {
          hash: hash,
          salt: salt
        };
        callback(null, that);
      } else {
        callback(err, null);
      }
    });
  });
};

/**
 * Verifies a users password
 * @param {String} password
 * @param {Fn} callback
 */
UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, (this.password).hash, callback);
};

/**
 * Authenticates a user
 * @param {String} username
 * @param {String} password
 * @param {Fn} callback
 */
UserSchema.statics.authenticate = function (username, password, callback) {
  this.findOne( {
    username: username
  }, function(err, user) {
    if (err) {
      callback(err);
      return;
    }
    if (!user) {
      callback(null, false);
      return;
    }
    user.verifyPassword(password, function(err, passwordCorrect) {
      if (err) {
        callback(err);
        return;
      }
      if (!passwordCorrect) {
        callback(null, false);
        return;
      }

      user.lastlogin = new Date();
      user.save();

      callback(null, user);
      return;
    });
  });
};


var User = module.exports = mongoose.model( 'User', UserSchema );
