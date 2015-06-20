var mongoose        = require( 'mongoose' ),
    GoogleStrategy  = require( 'passport-google-oauth' ).OAuth2Strategy,
    SpotifyStrategy = require( 'passport-spotify' ).Strategy,
    FacebookStrategy = require( 'passport-facebook' ).Strategy,
    LocalStrategy   = require( 'passport-local' ).Strategy,
    User            = require( '../schema/user.js' );

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
    passport.use(new FacebookStrategy(
        {
            clientID: "1625508111055508",
            clientSecret: "dbf49fb5534d645c0bfc818462cde9e3",
            callbackURL: "http://localhost:8080/auth/facebook/return",
            enableProof: false
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("Returned ok from Facebook with profile " + profile.id);
            User.findOne({ facebookId: profile.id }, function (err, user) {
                if( err || !user ) {
                    console.log("Could not find connected user.");
                    return done(err, false);
                }
                console.log("Found " + user.username);
                return done(err, user);
            });
        }
    ));
    passport.use(new SpotifyStrategy(
        {
            clientID: "13c896b9bdb34fcd8e7746ca7068cd21",
            clientSecret: "e2ece85fd544471082dd4d69bdf38b7c",
//            callbackURL: "http://dx-chalmers.herokuapp.com/auth/spotify/return"
            callbackURL: "http://localhost:8080/auth/spotify/return"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("Returned ok from Spotify with profile " + profile.id);
            User.findOne({ spotifyId: profile.id }, function (err, user) {
                if( err || !user ) {
                    console.log("Could not find connected user.");
                    return done(err, false);
                }
                console.log("Found " + user.username);
                return done(err, user);
            });
        }
    ));

    passport.use(new GoogleStrategy(
        {
            clientID: "967532746305-7c8devbp3egrldmb7as33nnhb2eadbjj.apps.googleusercontent.com",
            clientSecret: "xhVjrvHYOr_GVMREqoqUjZ1t",
//            callbackURL: "http://dx-chalmers.herokuapp.com/auth/google/return"
            callbackURL: "http://localhost:8080/auth/google/return"
        },
        function(token, tokenSecret, profile, done) {
            console.log("Returned ok from Google with profile " + profile.id);
            User.findOne({ googleId: profile.id }, function (err, user) {
                if( err || !user ) {
                    console.log("Could not find connected user.");
                    return done(err, false);
                }
                console.log("Found " + user.username);
                return done(err, user);
            });
        }
    ));

    // use local strategy
    passport.use(new LocalStrategy(
        function (username, password, callback) {
            User.authenticate(username, password, function(err, user) {
                return callback(err, user);
            });
        }));
};
