const { json } = require( 'body-parser' );
const express = require( 'express' );
const session = require( 'express-session' );
const mongoose = require( 'mongoose' );
const app = express();
const cors = require( 'cors' );
const port = 4001;
const passport = require( 'passport' );
const FacebookStrategy = require( 'passport-facebook' ).Strategy;
const fbConfig = require( './fbConfig.js' )
const mongoUri = "mongodb://localhost:27017/MovieMeet"
const User = require( './Users/User.js' ) ;


app.use( json() );
app.use( cors() );
app.use( session( { secret: 'pickles' } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static( `${ __dirname }/../public`) );

passport.use( new FacebookStrategy(fbConfig, (token, refreshToken, profile, done) => {
  process.nextTick( function(){
     const newUser = {
           fb_id: profile.id
           , age_range: profile._json.age_range
           , first_name: profile.name.givenName
           , gender: profile.gender
           , photo: profile._json.picture.data.url
     }
     User.findOrCreate( { fb_id: profile.id }, newUser, ( err, user ) => {
        if ( err ){
          return done( err )
        }
        return done( null, profile );
     } )

  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

require( "./masterRoutes" )(app);

mongoose.connect( mongoUri );
mongoose.connection.once( 'open', () => console.log( `Connected to MongoDB at ${ mongoUri }`) );

app.listen( port, () => console.log( `Listening on ${ port }` ) );
