angular.module( 'movieMe' )
  .controller( 'homeCtrl', function( $scope, $rootScope, mainServ ) {

   function findOrAdd(){
      mainServ.addUser().then( function( user ){
        $rootScope.user = user;
        console.log($rootScope.user)
      })
    }
    findOrAdd();


    $scope.saveZip = function(zip) {
      let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( zip );

      if( !isValidZip ){
         return alert( "Please Enter A Valid Zip");
      }
        $rootScope.isLoading = true;
        mainServ.getMoviesByZip(zip)
            .then(function( movies ) {
                $scope.movies = movies;
                  $rootScope.isLoading = false;
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
