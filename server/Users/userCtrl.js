const User = require( './User.js' ) ;

module.exports = {

  getUserById: function( req, res ){
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

  , addUser: function( req, res ){
    const user = {
      fb_id: req.user.id
      , age_range: req.user._json.age_range
      , first_name: req.user.name.givenName
      , gender: req.user.gender
      , photo: req.user.photos.value
    };
    User.findOne( { fb_id: req.user.id }, function( err, existingUser ) {
      if( err ) {
        console.log( "req.user.id")
        return res.status( 500 ).json( err );
      } else {
        if( existingUser ) {
          return res.status(200 ).json(existingUser);
        } else {
          User.create( user, function( error, newUser ) {
            if( error ) {
              return res.status( 500 ).json( error );
            } else {

              return res.status( 200 ).json( newUser );
            }
          } );
        }
      }
    })
  }

  , updatePrefs: function( req, res ){
    if( !req.params.id ){
      return res.status( 400 ).send( "Invalid User" )
    };
    User.findByIdAndUpdate( req.params.id, { $set:  { preferences: req.body } }, { new: true, upsert: true }, ( err, response ) => {
      if( err ){
        return res.send( err )
      }
      else {
        return res.json( response )
      }
    })
    }

    , updateMovie: function( req, res ){
      if( !req.params.id ){
        return res.status( 400 ).send( "Invalid User" )
      };
      User.findByIdAndUpdate( req.params.id, { $set:  { movie: req.body } }, { new: true, upsert: true }, ( err, response ) => {
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
