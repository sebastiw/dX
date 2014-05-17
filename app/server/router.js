var user = require( './controllers/view/user-view-controller' ),
    util = require( './controllers/view-utils' );

module.exports = function( app ) {
  app.get('/', user.attemptLogin);
  app.get('*', util.notfound);
};
