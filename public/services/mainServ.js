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
    this.setUser = function() {
      return $http.get( `${ ref.url }/api/currentuser` ).then( response => {
        return response.data;
      });
    }

    this.getUserById = function( id ){
      return $http.get(  `${ ref.url }/api/user/${ id }` ).then( response => {
        return response.data;
      })
    }

    // this.findMatches = function() {
    //     return $http.get( `${ ref.url }/api/user` ).then( response => {
    //          return response.data.filter( elem => {
    //            console.log( this.tempZip )
    //             return elem.tempZip && elem.tempZip.startsWith( this.tempZip.substr(0,2) );
    //          } );
    //     });
    // }

    this.getUsers = function() {
        return $http.get( `${ ref.url }/api/user` ).then( response => {
            return response.data;
        });
    }

    this.findOrAddUser = function(){
      return $http.get( `${ ref.url }/auth/facebook/` ).then( response => {
        return response;
      })
    }
    // this.addUser = function() {
    //     return $http.post(`${ref.url}/api/user`).then(function(user) {
    //         return user.data;
    //     });
    // }

    this.logMeOut = function(){
      return $http.get( `${ ref.url }/logout` )
    }

    this.updatePrefs = function( Preferences, id ) {
        return $http.put( `${ref.url}/api/user/${id}`, Preferences ).then( response => {
          this.user = response.data;

          return response.data;
        })
    }
    this.saveMovieAndLocation = function( data, id ) {
        return $http.put( `${ref.url}/api/movie/${id}`, data ).then( response => {
          this.user = response.data;
        })
    }


    //matches
    this.findMatches = function(){
      return $http.get( `${ ref.url }/api/matches/` ).then( response => {

        if ( typeof ( Number.prototype.toRad ) === "undefined" ) {
            Number.prototype.toRad = function() {
              return this * Math.PI / 180;
            }
        }

        let multiMatches = response.data.filter( elem => {

              let myAgePref = this.user.preferences.age_range.match( /\d+/g );
              let dateAgePref = elem.preferences.age_range.match( /\d+/g );

              //Calculating distance between user & "dates"
              let myLon = this.user.location.longitude;
              let myLat = this.user.location.latitude;
              let matchLon = elem.location.longitude;
              let matchLat = elem.location.latitude;
              let R = 6371;
              let dLat = ( matchLat - myLat ).toRad();
              let dLon = ( matchLon - myLon ).toRad();
              myLat = myLat.toRad();
              matchLat = matchLat.toRad();

              let a = Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
                      Math.sin( dLon / 2 ) * Math.sin( dLon / 2 ) * Math.cos( myLat ) * Math.cos( matchLat );

              let c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );

              let distBetween = Math.floor( ( R * c ) / 1.609344 ); //In miles

          return elem.fb_id !== this.user.fb_id && elem.movie.title === this.user.movie.title && elem.gender.toLowerCase() === this.user.preferences.gender.toLowerCase() && elem.age <= myAgePref[1] && elem.age >= myAgePref[0] && this.user.age <= dateAgePref[1] && this.user.age >= dateAgePref[0] && this.user.gender.toLowerCase() === elem.preferences.gender.toLowerCase() && distBetween <= 50;
        } )

        let match = multiMatches.shift();

        return match;

       })
      }



    //movies

    this.toggleLoading = function(){
      if( this.Loading ){
        this.Loading = false;
        return this.Loading;
      }
      this.Loading = true;
      return this.Loading;
    }

    this.getMovies = function() {
        // this.tempZip = zipCode;
        let day = new Date().getDate() < 10 ? `0${ new Date().getDate() }` : `${ new Date().getDate() }`;
        let month = new Date().getMonth() < 9 ? `0${ new Date().getMonth() + 1 }` : `${ new Date().getMonth() + 1 }`;
        let year = new Date().getFullYear();
        let currentDate = `${ year }-${ month }-${ day }`;

        return $http.get(`${ onConnBase }${ currentDate }&lat=${ this.latitude }&lng=${ this.longitude }&radius=15&units=mi&imageSize=Lg&api_key=${ onConnKey }`)
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
