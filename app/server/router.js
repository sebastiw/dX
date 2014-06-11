var user  = require( './controllers/view/user.js' ),
    index = require( './controllers/view/index.js' ),
    util  = require( './controllers/view-utils.js' );

module.exports = function( app ) {
  app.get('/',                               user.attemptlogin);
  app.post('/',                              user.login);
  app.get('/home', util.ensureAuthenticated, index.home);
  app.get('*',                               util.notfound);
};
