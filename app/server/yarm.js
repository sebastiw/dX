var yarm   = require( 'yarm' ),
    utils  = require( './controllers/api-utils.js' ),
//    user   = require( './controllers/api/user.js' ),
    post   = require( './controllers/api/post.js' );


// yarm.resource("user")
//   .hook(utils.isAuthenticated).get( user.getUser );

yarm.resource("posts")
  .hook(utils.isAuthenticated).get( post.getPosts );
yarm.resource("post/newpost")
  .hook(utils.isAuthenticated).post( post.newPost );
