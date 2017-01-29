// const userCtrl = require( "./userCtrl.js")
// const passport = require( "passport" );
// const FacebookStrategy = require( "passport-facebook" ).Strategy;
//
// module.exports = app => {
//   app.get( '/auth/facebook', passport.authenticate( 'facebook' ) );
//   app.get( '/auth/facebook/callback', passport.authenticate( 'facebook', {
//       successRedirect: "/#/home"
//       , failureRedirect: "/"
//     } ) );
//
//
//
//     passport.serializeUser((user, done) => {
//       done(null, user);
//     });
//
//     passport.deserializeUser((obj, done) => {
//       done(null, obj);
//     });
//
//   app.get( '/api/user/:id', userCtrl.getUserById );
//   app.get( '/api/user', userCtrl.getUsers );
//   app.post( '/api/user', userCtrl.addUser );
//   app.put( '/api/user/:id', userCtrl.updatePrefs );
//
//
//   // app.get( '/api/user', userCtrl.getCurrentUser );
//
// }
