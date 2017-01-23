angular.module("movieMe").service("mainServ", function($http, $rootScope, ref) {
    // const distUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ user1Lat + ',' + user1Lon + '&destinations=' + user2Lat + ',' + user2Lon + '&key=' + distKey;
    // const distKey = 'AIzaSyBQG4gzjr4KzXIpJlJc6WYoMlWqG7X7J3I';
    // const userLat = "32.776664"
    // const userLong = "-96.796988";
    const onConnBase = 'http://data.tmsapi.com/v1.1/movies/showings?startDate='
    //  const onConnBase2 = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2016-10-20&zip=75201&radius=15&units=mi&api_key="
    const onConnKey = 'rnwu9qff92c73cgqmb6njsmv';
    const movieDBKey = "b69217f2093417f5a3fa7f766e391c60"
    const imageReq = "https://api.themoviedb.org/3/search/movie?api_key="
    const imageBaseUrl = "https://image.tmdb.org/t/p/original"


    //users
    this.getUsers = function() {
        return $http.get(`${ref.url}/api/user`).then(function(response) {
            return response.data
        });
    }

    this.addUser = function() {
        return $http.post(`${ref.url}/api/user`).then(function(user) {
            console.log("user", user)
            return user.data;
        });
    }

    this.updatePrefs = function(Preferences, id) {
        return $http.put(`${ref.url}/api/user/${id}`, Preferences)
    }
    this.updateMovieAndZip = function(data, id) {
        return $http.put(`${ref.url}/api/movie/${id}`, data )
    }
    this.matchUser = function(user, id) {
        console.log(user);
        return $http.put(`${ref.url}/api/movie/${id}`, matchStat)
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

    this.getMoviesByZip = function( zipCode ) {
        $rootScope.tempZip = zipCode
        let day = new Date().getDate() < 10 ? `0${ new Date().getDate() }` : `${ new Date().getDate() }`;
        let month = new Date().getMonth() < 9 ? `0${ new Date().getMonth() + 1 }` : `${ new Date().getMonth() + 1 }`;
        let year = new Date().getFullYear();
        let currentDate = `${ year }-${ month }-${ day }`;

        return $http.get(`${ onConnBase }${ currentDate }&zip=${ zipCode }&radius=15&units=mi&imageSize=Lg&api_key=${ onConnKey }`)
            .then( response => {
                response.data = response.data.slice(0, 40);
                response.data.forEach( movie => {
                    movie.showtimes.forEach(( showtime, index, orig ) => {
                        let newTimes = [];
                        for ( let i = 0; i < orig.length; i++ ) {
                            if ( showtime.theatre.id === orig[i].theatre.id && orig.map( item => {
                                    return item.theatre.id
                                }).indexOf( showtime.theatre.id ) === index ) {
                                newTimes.push( orig[i].dateTime )
                                showtime.dateTime = newTimes;
                            }
                        }
                    })
                })

                return response.data.map( movie => {
                    movie.showtimes = movie.showtimes.filter(( showtime, index, orig ) => {
                        return orig.map( item => {
                            return item.theatre.id
                        }).indexOf( showtime.theatre.id ) === index
                    })

                    return movie;
                })

            })
            .then( movies => {
                var setImageUrl = ( i ) => {

                  var search = movies[i].title.split(" ").splice(0, 3).join(" ");

                    return $http.get( imageReq + movieDBKey + "&query=" + search ).then( response => {
                      movies[i].imageUrl =

                      response.data.results[0]

                      ?

                      imageBaseUrl + response.data.results[0].poster_path

                      :

                      "../styles/images/The_Title.jpg"
                    })
               }

                for( var i = 0; i < movies.length; i++ ){
                    setImageUrl( i )
                }

                return movies;

              })

            }










    /*

    Match Users:
      1. Pull user objects into an array based off theater selected
      2. Loop through array looking for a match based of search criteria
      3. Have a "isMatched" boolean property on each user

      */



})
