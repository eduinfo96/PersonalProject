angular.module("movieMe").service("mainServ", function($http, ref) {
    // const distUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ user1Lat + ',' + user1Lon + '&destinations=' + user2Lat + ',' + user2Lon + '&key=' + distKey;
    // const distKey = 'AIzaSyBQG4gzjr4KzXIpJlJc6WYoMlWqG7X7J3I';
    // const userLat = "32.776664"
    // const userLong = "-96.796988"
    // const onConnBase = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + newDate + '&lat=' + userLat + '&lng=' + userLong + '&radius=15&units=mi&api_key='
    //  const onConnBase2 = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2016-10-20&zip=75201&radius=15&units=mi&api_key="
    // **Format New Date**
    // const onConnKey = 'rnwu9qff92c73cgqmb6njsmv';


    //users
    this.addUser = function(){
      return $http.post( `${ref.url}/api/user/`).then(function(user){
        return user.data;
      });
    }

    this.updatePrefs = function( Preferences, id ){
       return $http.put(`${ref.url}/api/user/${id}`, Preferences)
    }
    this.updateMovie = function( movie, id ){
       return $http.put(`${ref.url}/api/movie/${id}`, movie)
    }

    //movies

    // this.getMovies = function() {
    //   return $http.get( onConnBase2 + onConnKey  ).then( function( response ){
    //     const movies = [];
    //     for( var i = 0; i < response.data.length; i++){
    //
    //     }
    //   })
    // }

    this.getMoviesByZip = function( zipCode ){
      return $http.get( `${ref.url}/api/movies?zip=${zipCode}` )
    }








    /*

    Match Users:
      1. Pull user objects into an array based off theater selected
      2. Loop through array looking for a match based of search criteria
      3. Have a "isMatched" boolean property on each user

      */



})
