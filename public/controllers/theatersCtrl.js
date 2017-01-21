angular.module('movieMe').controller("theatersCtrl", function(mainServ, $scope, $rootScope) {
    console.log($rootScope.user)


    $scope.saveZip = function( zip ) {
      let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test( zip );

      if( !isValidZip ){
        return alert( "Please Enter A Valid Zip.");
      }
        $rootScope.isLoading = true;
        mainServ.getMoviesByZip(zip)
            .then(function( movies ) {
                console.log( movies )
                $scope.movies = movies;
                $rootScope.isLoading = false;
            })

    }

    $scope.chooseMovie = function(movieTitle, theaterName) {
        const movie = {
            title: movieTitle,
            theater: theaterName
        }
        mainServ.updateMovie(movie, $rootScope.user._id)
            .then()
    }



});
