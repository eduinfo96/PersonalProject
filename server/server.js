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
const mongoUri = "mongodb://localhost:27017/"



app.use( json() );
app.use( cors() );
app.use( express.static( `${ __dirname }/public`) );
app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new FacebookStrategy(fbConfig, (token, refreshToken, profile, done) => {
  return done(null, profile);
}))

require( "./masterRoutes" )(app);

mongoose.connect( mongoUri );
mongoose.connection.once( 'open', () => console.log( `Connected to MongoDB at ${ mongoUri }`) );

app.listen( port, () => console.log( `Listening on ${ port }` ) );
