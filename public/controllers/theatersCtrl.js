angular.module('movieMe').controller("theatersCtrl", function(mainServ, $scope, $rootScope) {

    //   $scope.searchZip = Number;
    //
    //   $scope.getTheatersByZip = function( $rootScope.Zip ){
    //      mainServ.getTheatersByZip($rootScope.Zip).then( function(response) {
    //     $scope.results = response
    //   })
    // }
    console.log($rootScope.user)


    $scope.saveZip = function(zip) {
        mainServ.getMoviesByZip(zip)
            .then(function( movies ) {
                console.log( movies )
                $scope.movies = movies;
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
