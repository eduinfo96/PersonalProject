angular.module('movieMe').controller("theatersCtrl", function( mainServ, $scope ) {
    $scope.getMovies = function(){
      $scope.isLoading = mainServ.toggleLoading();
      mainServ.getMovies()
    }

    // $scope.saveZip = function( zip ) {
    //
    //   let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( zip );
    //
    //   if( !isValidZip ){
    //     return alert( "Please Enter A Valid Zip");
    //   }
    //     $scope.isLoading = mainServ.toggleLoading();
    //       mainServ.getMoviesByZip( zip )
    //           .then(function( movies ) {
    //               console.log( movies )
    //               $scope.movies = movies;
    //               $scope.isLoading = mainServ.toggleLoading();
    //           })
    //
    // }

    $scope.saveMovieAndLocation = function( movieObj ) {

        const data = {
            movie: {
              title: movieObj.title
              , poster: movieObj.imageUrl
              , theaters: movieObj.showtimes
            }
            , location: {
                latitude: mainServ.latitude
                , longitude: mainServ.longitude
            }
        }

        mainServ.saveMovieAndLocation( data, mainServ.user._id)
    }



});
