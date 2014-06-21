var user     = require( './controllers/view/user.js' ),
    index    = require( './controllers/view/index.js' ),
    admin    = require( './controllers/view/admin.js' ),
//    document = require( './controllers/view/document.js' ),
    util     = require( './controllers/view-utils.js' );

module.exports = function( app ) {
  app.get('/',                                    user.attemptlogin);
  app.post('/',                                   user.login);
  app.get('/home',      util.ensureAuthenticated, index.home);
  app.get('/logout',    util.ensureAuthenticated, user.logout);
  app.get('/admin',     util.ensureAuthenticated, admin.home);
  app.get('/settings',  util.ensureAuthenticated, user.settings);
//  app.get('/documents', util.ensureAuthenticated, util.notfound);
  app.get('*',                                    util.notfound);
};
