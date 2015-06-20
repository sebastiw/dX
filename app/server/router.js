var user     = require( './controllers/view/user.js' ),
    index    = require( './controllers/view/index.js' ),
    admin    = require( './controllers/view/admin.js' ),
//    document = require( './controllers/view/document.js' ),
    util     = require( './controllers/view-utils.js' );

module.exports = function( app, passport ) {
    app.get('/',                                    user.attemptlogin);
    app.post('/',                                   user.login);

    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/google/return
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.get('/auth/google/return',
            passport.authenticate('google', { successRedirect: '/home',
                                              failureRedirect: '/login' }));

    app.get('/home',      util.ensureAuthenticated, index.home);
    app.get('/logout',    util.ensureAuthenticated, user.logout);
    app.get('/admin',     util.ensureAuthenticated, admin.home);
    app.get('/settings',  util.ensureAuthenticated, user.settings);
    // app.get('/documents', util.ensureAuthenticated, util.notfound);
    app.get('*',                                    util.notfound);
};
