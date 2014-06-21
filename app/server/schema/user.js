var mongoose  = require( 'mongoose' ),
    Schema    = mongoose.Schema,
    bcrypt    = require( 'bcrypt' ),
    validator = require( 'validator' );


var rolelist = {
  values: ['USER', 'ADMIN'],
  message: "`{VALUE}` is not a valid {PATH} for a user."
};
var enum_role = {type: String, uppercase: true, default: 'USER', enum: rolelist};

var UserSchema = new Schema( {
  username:  {type: String, validator: validator.isAlpha, lowercase: true, unique: true, index: true},
  password: {
    hash: String,
    salt: String
  },
  email:     {type: String, validator: validator.isEmail, lowercase: true, unique: true, sparse: true},
  position:  {type: String, validator: validator.isAlphanumeric},
  year:      {type: Number, min: 1982, default: 1982},
  lastlogin: {type: Date, validator: validator.isDate},
  role:      enum_role
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
 * Generates a random password
 * @param {Number} length
 * @return {String}
 */
function randomPassword(length) {
  var chars
        = "abcdefghijklmnopqrstuvwxyz"
        + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        + "1234567890",
      pass = "";
  for(var x = 0; x < length; x++)
  {
    pass += chars.charAt(Math.floor(Math.random() * 62));
  }
  return pass;
}

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
    if( err ) {
      callback(err);
      return;
    }
    if( !user ) {
      callback(null, false);
      return;
    }
    user.verifyPassword(password, function(err, passwordCorrect) {
      if( err ) {
        callback(err);
        return;
      }
      if( !passwordCorrect ) {
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

UserSchema.statics.resetPassword = function (callback) {
  var generatedPassword = randomPassword(10);
  this.setPassword(generatedPassword, function (err, user) {
    if( err ) {
      callback( err );
      return;
    }
    user.save( callback );
  } );
};

var User = module.exports = mongoose.model( 'User', UserSchema );
