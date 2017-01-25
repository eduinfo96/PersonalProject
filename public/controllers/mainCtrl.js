angular.module( 'movieMe' ).controller( "mainCtrl", function( mainServ, $scope, $rootScope ){

  $scope.saveZip = function( zip ) {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( zip );

    if( !isValidZip ){
      return alert( "Please Enter A Valid Zip");
    }
     $rootScope.isLoading = true;
      mainServ.getMoviesByZip( zip )
          .then(function( movies ) {
              console.log( movies )
              $scope.movies = movies;
              $rootScope.isLoading = false;
          })
  }

})
