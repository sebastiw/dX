// var user = require( './controllers/view/user-view-controller' ),
//     util = require( './controllers/view-utils' );

module.exports = function( app ) {
  app.get('/', function (req,res){res.send('hi');});//user.attemptLogin);
  app.get('*', function (req,res){res.send('hello');}); //util.notfound);
};
