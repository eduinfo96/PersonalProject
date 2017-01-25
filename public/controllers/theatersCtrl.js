angular.module('movieMe').controller("theatersCtrl", function( mainServ, $scope ) {


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

    $scope.updateMovieAndZip = function( movieTitle, theaterName) {
        const data = {
            movie: {
              title: movieTitle
              , theater: theaterName
            }
            , tempZip: mainServ.tempZip
        }
        mainServ.updateMovieAndZip( data, mainServ.user._id)
    }



});
