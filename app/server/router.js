var user     = require( './controllers/view/user.js' ),
    index    = require( './controllers/view/index.js' ),
    admin    = require( './controllers/view/admin.js' ),
//    document = require( './controllers/view/document.js' ),
    util     = require( './controllers/view-utils.js' );

module.exports = function( app, passport ) {
    app.get('/',                                    user.attemptlogin);
    app.post('/',                                   user.login);

    // GOOGLE
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/return',
            passport.authenticate('google', { successRedirect: '/home',
                                              failureRedirect: '/logout' }));

    // SPOTIFY
    app.get('/auth/spotify',
            passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] }),
            function(req, res){
                // The request will be redirected to spotify for authentication, so this
                // function will not be called.
            });

    app.get('/auth/spotify/return',
            passport.authenticate('spotify', { failureRedirect: '/logout' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            });

    // FACEBOOK
    app.get('/auth/facebook',
            passport.authenticate('facebook'));
    app.get('/auth/facebook/return',
            passport.authenticate('facebook', { failureRedirect: '/logout' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            });

    app.get('/home',      util.ensureAuthenticated, index.home);
    app.get('/logout',    util.ensureAuthenticated, user.logout);
    app.get('/admin',     util.ensureAuthenticated, admin.home);
    app.get('/settings',  util.ensureAuthenticated, user.settings);
    // app.get('/documents', util.ensureAuthenticated, util.notfound);
    app.get('*',                                    util.notfound);
};
