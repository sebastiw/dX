var Post = require( '../../schema/post.js' ),
    User = require( '../../schema/user.js' );

module.exports.getPosts = function (req, callback) {
  Post.getPosts(req.param('nof'),
                new Date(req.param('fe')),
                callback);
};

module.exports.newPost = function (req, callback) {
  var post = new Post( {
    poster: req.user.username,
    message: req.param("message")
  } );

  post.save(function(err, post) {
    callback(err, post);
  } );
};
