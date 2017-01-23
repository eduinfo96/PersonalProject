const mongoose = require( 'mongoose' );

const User = new mongoose.Schema( {
  fb_id: { type: Number, unique: true, required: true }
  , first_name: { type: String, required: true }
  , gender: { type: String, required: true }
  , age_range: { type: Object, required: true }
  , isPaired: { type: Boolean, default: false }
  , photo: { type: String }
  , preferences: { type: Object }
  //   type: mongoose.Schema.Type.ObjectId
  //   , ref: "Preferences"
  , movie: { type: Object }
  , tempZip: { type: String }
})


module.exports = mongoose.model("User", User);
