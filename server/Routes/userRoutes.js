const userCtrl = require( "../Controllers/userCtrl")
const passport = require( "passport" );
const FacebookStrategy = require( "passport-facebook" ).Strategy;

module.exports = app => {
  app.get( '/auth/facebook', passport.authenticate( 'facebook' ) );
  app.get( '/auth/facebook/callback', passport.authenticate( 'facebook', {
      successRedirect: "/#/home"
      , failureRedirect: "/"
    }), ( req, res ) => {
      console.log( res )
      console.log( req );
    })



    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });

    app.get( '/api/user', function(req, res) {
      console.log(req.user.gender);
    });

}
