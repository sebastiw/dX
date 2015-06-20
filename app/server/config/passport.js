var mongoose       = require( 'mongoose' ),
    GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy,
    LocalStrategy  = require( 'passport-local' ).Strategy,
    User           = require( '../schema/user.js' );

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

    var server = require('os').hostname();
    console.log("hostname: " + server);

    passport.use(new GoogleStrategy(
        {
            clientID: "967532746305-7c8devbp3egrldmb7as33nnhb2eadbjj.apps.googleusercontent.com",
            clientSecret: "xhVjrvHYOr_GVMREqoqUjZ1t",
            callbackURL: "http://dx-chalmers.herokuapp.com/auth/google/return"
//            callbackURL: "http://127.0.0.1:8080/auth/google/return"
        },
        function(token, tokenSecret, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));

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
