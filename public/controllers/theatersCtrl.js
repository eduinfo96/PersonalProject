angular.module('movieMe').controller("theatersCtrl", function(mainServ, $scope, $rootScope) {
    console.log($scope.user)


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

    $scope.updateMovieAndZip = function( movieTitle, theaterName) {
        const data = {
            movie: {
              title: movieTitle
              , theater: theaterName
            }
            , tempZip: $rootScope.tempZip
        }
        mainServ.updateMovieAndZip( data, $rootScope.user._id)
    }



});
