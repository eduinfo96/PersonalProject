angular.module( 'movieMe' ).controller( "mainCtrl", function( mainServ, $scope ){

  $scope.saveZip = function( zip ) {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( zip );

    if( !isValidZip ){
      return alert( "Please Enter A Valid Zip");
    }
     mainServ.isLoading = true;
      mainServ.getMoviesByZip( zip )
          .then(function( movies ) {
              $scope.movies = movies;
              mainServ.isLoading = false;
          })
  }

})
