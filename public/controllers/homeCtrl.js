angular.module( 'movieMe' )
  .controller( 'homeCtrl', function( $scope, mainServ ) {

   (function init(){
       if( mainServ.user ){
         mainServ.getUserById( mainServ.user._id ).then( user => {
           mainServ.user = user;
           console.log( mainServ.user );
         })
       }
       else {
        mainServ.setUser().then( user => {
          mainServ.user = user;
          console.log( mainServ.user );
        })
      }

        navigator.geolocation.getCurrentPosition(function success(position) {
        mainServ.latitude  = position.coords.latitude;
        mainServ.longitude = position.coords.longitude;
       });
       
    }());


    $scope.saveZip = function( zip ) {
      let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( zip );

      if( !isValidZip ){
        return alert( "Please Enter A Valid Zip");
      }
       mainServ.isLoading = true;
        mainServ.getMoviesByZip( zip )
            .then(function( movies ) {
                console.log( movies )
                $scope.movies = movies;
                mainServ.isLoading = false;
            })
    }



    // $scope.putUser = function( _id ) {
    //   mainServ.putUser( _id, $scope.info2Update ).then( response => {
    //     mainServ.getUer(_id).then()
    //     $scope.user = response.data;
    //   } )
    // }
    //
    // this.putUser = function( _id, info2Update ) {
    //   return $http.put( '/api/user/' + _id, info2Update );
    // }


//
  } );
