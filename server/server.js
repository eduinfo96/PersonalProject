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
const sessConfig = require( './sessConfig.js' );
const mongoUri = "mongodb://localhost:27017/MovieMeet"
const User = require( './Users/User.js' ) ;

app.use( express.static( `${ __dirname }/../public`) );
app.use( json() );
app.use( cors() );
app.use( session( sessConfig ) );
app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new FacebookStrategy(fbConfig, (token, refreshToken, profile, done) => {
  process.nextTick( function(){
   const newUser = {
           fb_id: profile.id
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
  console.log( "Serialized: ", user.id )
  done(null, user.id);
});

passport.deserializeUser(( id, done ) => {
  User.findOne( { fb_id: id }, ( err, user ) => {
    console.log( "Deserialized: ", user.id )
    done( err, user )
  });
});

require( "./masterRoutes" )(app);

mongoose.connect( mongoUri );
mongoose.connection.once( 'open', () => console.log( `Connected to MongoDB at ${ mongoUri }`) );

app.listen( port, () => console.log( `Listening on ${ port }` ) );
