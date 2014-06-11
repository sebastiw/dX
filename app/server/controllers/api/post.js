var Post = require( '../../schema/post.js' ),
    User = require( '../../schema/user.js' );

module.exports.getPosts = function (req, callback) {
  Post.getPosts(req.param('nof'),
                new Date(req.param('fe')),
                callback);
};
