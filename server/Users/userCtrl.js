const User = require( './User.js' ) ;
const findOrCreate = require( 'mongoose-findorcreate' );


module.exports = {

  setUser: function( req, res ){
    console.log( "Set User: ", req.user )
    console.log( "Set Cookie: ", req.session.cookie )
    User.findOne( { fb_id: req.user.fb_id }, ( err, user ) => {
      if ( err ){
        return res.status( 400 ).send( "Invalid User")
      }
      return res.status( 200 ).json( user );
    } )
  }

  , getUserById: function( req, res ){
    User.findById( req.params.id, function( err, existingUser) {
      if( err ){
       return res.status( 400 ).json( err )
      }
      else {
        return res.status( 200 ).json( existingUser )
      }
    })
  }

  , getUsers: function( req, res ){
    User.find( {}, function( err, users ){
      if( err ){
        return res.status( 400 ).json( err )
      }
      else {
        return res.status( 200 ).json( users )
      }
    })
  }

  , findMatches: function( req, res ){
    User.find( { isPaired: false, movie: { $exists: true }, preferences: { $exists: true }, location: { $exists: true } }, function( err, users ){
      if( err ){
        return res.status( 400 ).json( err )
      }
      else {
        return res.status( 200 ).json( users )
      }
    })
  }

  , updatePrefs: function( req, res ){
    if( !req.user ){
      return res.status( 400 ).send( "Invalid User" )
    };
    User.findByIdAndUpdate( req.user._id, { $set:  { preferences: req.body.preferences, age: req.body.age } }, { new: true, upsert: true }, ( err, response ) => {
      if( err ){
        return res.send( err )
      }
      else {
        return res.json( response )
      }
    })
    }

    , saveMovieAndLocation: function( req, res ){
      if( !req.user ){
        return res.status( 400 ).send( "Invalid User" )
      };
      User.findByIdAndUpdate( req.user._id, { $set:  { location: req.body.location, movie: req.body.movie  } }, { new: true, upsert: true }, ( err, response ) => {
        if( err ){
          return res.send( err )
        }
        else {
          return res.json( response )
        }

      })
      }

      // Present-Only
    , findMatch: function( req, res ){
      User.find( {},{movie: true}, function( err, users ){
        if ( err ){
          return res.send( err )
        }
        else {
          return res.json( users )
        }
      })
    }

    , deleteUser: function( req, res ){
      User.findByIdAndRemove( req.params.id , req.body, ( err, response ) => {
        if( !req.params.id ){
          return res.status( "500" ).json( "Invalid I.D." );
        }
        else {
          return res.json( response );
        }
      })
    }

    //Authenticating & Logging Out

    , isAuthenticated: function( req, res, next ){
      if( req.isAuthenticated() ){
          return next();
      }
      return res.status( 401 );
    }

    , logMeOut: function( req, res ){
      req.logout();
      res.redirect( "/" );
    }









  //
  // app.post( '/api/user/:id' )
  //
  // updateUser( req, res ){
  //   User.findById( req.params.id, ( error, response ) => {
  //
  //   })
  // }

  // getCurrentUser: function( req, res ){
  //
  //   User.find( {}, function( err, users ) {
  //     if( err ) {
  //       return res.status( 500 ).json( err );
  //     } else {
  //       return res.status( 200 ).json( users );
  //     }
  //   } );
  //
  // }
}
