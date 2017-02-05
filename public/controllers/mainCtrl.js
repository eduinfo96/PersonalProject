angular.module( 'movieMe' ).controller( "mainCtrl", function( mainServ, $scope ){

  $scope.getMovies = function(){
      $scope.isLoading = mainServ.toggleLoading();

      navigator.geolocation.getCurrentPosition(function success(position) {

      getMovies(position.coords.latitude, position.coords.longitude)

      function getMovies( lat, lon ){

       mainServ.latitude = lat;
       mainServ.longitude = lon;

       mainServ.getMovies().then( movies => {
         $scope.movies = movies;
         $scope.isLoading = mainServ.toggleLoading();
       })
      }

   });
 }






})
