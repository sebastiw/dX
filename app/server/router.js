var user = require( './controllers/view/user.js' ),
    util = require( './controllers/view-utils.js' );

module.exports = function( app ) {
  app.get('/', user.attemptLogin);
  app.post('/', user.login);
  app.get('/home', util.ensureAuthenticated, index.home);
  app.get('*', util.notfound);
};
