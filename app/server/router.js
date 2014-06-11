var user     = require( './controllers/view/user.js' ),
    index    = require( './controllers/view/index.js' ),
    admin    = require( './controllers/view/admin.js' ),
    document = require( './controllers/view/document.js' ),
    util     = require( './controllers/view-utils.js' );

module.exports = function( app ) {
  app.get('/',                               user.attemptlogin);
  app.post('/',                              user.login);
  app.get('/home', util.ensureAuthenticated, index.home);
  app.get('/logout',                         user.logout);
  app.get('/admin',                          admin.home);
  app.get('/documents',                      util.notfound);
  app.get('*',                               util.notfound);
};
