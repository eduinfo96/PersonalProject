const mongoose = require( 'mongoose' );
const findOrCreate = require( 'mongoose-findorcreate' );


const User = new mongoose.Schema( {
  fb_id: { type: Number, unique: true, required: true }
  , first_name: { type: String, required: true }
  , gender: { type: String, required: true }
  , age: { type: String }
  , isPaired: { type: Boolean, default: false }
  , photo: { type: String }
  , preferences: { type: Object }
  //   type: mongoose.Schema.Type.ObjectId
  //   , ref: "Preferences"
  , movie: { type: Object }
  , location: { type: Object }
})

User.plugin( findOrCreate );

module.exports = mongoose.model("User", User);
