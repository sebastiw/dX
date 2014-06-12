var mongoose  = require( 'mongoose' ),
    validator = require( 'validator' ),
    su        = require( './schema_util.js' ),
    Schema    = mongoose.Schema;

var PostSchema = new Schema( {
  poster:      su.ref( 'User' ),
  eventOn:     {type: Date, default: Date.now, validator: validator.isDate},
  message:     {type: String}
} );

/**
 * Get numberOfFeeds feeds, where the feeds happened
 * before fromEvent and are posted from user references
 * in the who array.
 * @param {Number} numberOfFeeds
 * @param {Date} fromEvent
 * @param {Ref[]} who
 * @param {fn} callback
 */
PostSchema.statics.getPosts = function(numberOfPosts,
                                       fromEvent,
                                       callback) {
  console.log("getPosts - " + numberOfPosts +" - " + fromEvent);
  if( !(fromEvent instanceof Date) || isNaN(fromEvent.valueOf()) ) {
    fromEvent = new Date();
  }
  if( typeof numberOfPosts != 'number' || numberOfPosts < 1 ) {
    numberOfPosts = 5;
  }
  this.find( {
    eventOn: {$lt: fromEvent}
  } ).sort( {
    eventOn: 'descending'
  } ).limit( numberOfPosts ).exec( callback );
};

var Post = module.exports = mongoose.model( 'Post', PostSchema );
