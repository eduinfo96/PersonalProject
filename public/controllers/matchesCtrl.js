angular.module( "movieMe" ).controller( "matchesCtrl", function( $scope, mainServ ){
      (function init(){

        (function findMatches(){

          mainServ.buildPoster().then( matches => {
            $scope.matches = matches;
            console.log( matches )
          })

        }());

      }());


      // $scope.findDate() = function(){
      //   const searchObj = {
      //     age:
      //   }
      //
      //   mainServ.findDate().then( )
      // }


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
