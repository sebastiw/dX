var mongoose = require( 'mongoose' ),
    Schema   = mongoose.Schema;


/**
 * Creates a reference to another schema.
 * @param  {Ref} reference the referenced Schema.
 * @return {Object} a plain object with reference to use in schema.
 */
module.exports.ref = function( reference ) {
  return { type: Schema.Types.ObjectId, ref: reference };
};
