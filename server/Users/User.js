const mongoose = require( 'mongoose' );

const User = new mongoose.Schema( {
  fb_id: { type: Number, unqiue: true, required: true }
  , first_name: { type: String, required: true }
  , gender: { type: String, required: true }
  , age_range: { type: Object, required: true }
  , isMatched: { type: Boolean, default: false }
  , photo: { type: String }
  , preferences: { type: Object }
  //   type: mongoose.Schema.Type.ObjectId
  //   , ref: "Preferences"

})


module.exports = mongoose.model("User", User);
