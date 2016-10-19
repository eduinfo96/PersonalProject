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
      console.log("this is the exsisting user",existingUser);
      if( err ) {
        return res.status( 500 ).json( err );
      } else {
        if( existingUser ) {
          console.log("user was found!, I should now send back the user to the front end")
          return res.status( 200 ).json( existingUser );
        } else {
          User.create( user, function( error, newUser ) {
            console.log("user was not found, will now create user.");
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
