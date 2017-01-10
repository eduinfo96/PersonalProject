angular.module( 'movieMe' )
  .controller( 'homeCtrl', function( $scope, $rootScope, mainServ ) {

   function findOrAdd(){
     console.log( $rootScope.user)
      mainServ.addUser().then( function( user ){
        $rootScope.user = user;
        console.log($rootScope.user)
      })
    }
    findOrAdd();


    $scope.saveZip = function(zip){
      mainServ.getMoviesByZip(zip)
          .then( function( movies ){
        console.log( movies )
        $scope.movies = movies;
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
