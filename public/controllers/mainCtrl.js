angular.module( 'movieMe' ).controller( "mainCtrl", function( mainServ, $scope ){

  $scope.getMovies = function(){
    $scope.isLoading = mainServ.toggleLoading();
    mainServ.getMovies().then( movies => {
      $scope.movies = movies;
      $scope.isLoading = mainServ.toggleLoading();
    })
  }


})
