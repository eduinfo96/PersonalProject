angular.module( "movieMe" ).controller( "matchesCtrl", function( $scope, mainServ ){
      // (function init(){
      //
      //   // (function findMatches(){
      //   //
      //   //   mainServ.buildPoster().then( matches => {
      //   //     $scope.matches = matches;
      //   //     console.log( matches )
      //   //   })
      //   //
      //   // }());
      //
      // }());
      //
      //
      $scope.findDate = function(){
        mainServ.getUsers().then( users => {
          let possibles = users.filter( elem => {
            const myAgePref = mainServ.user.preferences.age_range.match( /\d+/g );
            const dateAgePref = elem.preferences.age_range.match( /\d+/g );
            return elem.movie.title == mainServ.user.movie.title && elem.gender.toLowerCase() === mainServ.user.preferences.gender.toLowerCase() && elem.age <= myAgePref[1] && elem.age >= myAgePref[0] && mainServ.user.age <= dateAgePref[1] && mainServ.user.age >= dateAgePref[0] && mainServ.user.gender.toLowerCase() === elem.preferences.gender.toLowerCase();
          } )

          

        } )
      }


    // $scope.findMovies = function(){
    //     mainServ.getUsers().then( function(response){
    //       // const newUsers = [];
    //       // for( var i = 0; i < response.data; i++){
    //       //   if(response.data[i].hasOwnProperty(movie)){
    //       //     newUsers.push(response.data[i]);
    //       //   }
    //       // }
    //       $scope.newUsers = response;
    //       console.log($scope.newUsers)
    //     })
    // }
    // // $scope.findMovies()
    //
    // $scope.matchUser = function(){
    //   mainServ.matchUser( user, $rootScope.user._id ).then()
    //
    // }
});
