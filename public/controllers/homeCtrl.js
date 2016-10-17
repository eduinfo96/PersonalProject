angular.module( 'movieMe' )
  .controller( 'homeCtrl', function( $scope, $http, $window, faceBookFact ) {
//
//

//
//     $window.fbAsyncInit = function() {
//       FB.init({
//         appId: '{335244326867279}',
//         status: true,
//         cookie: true,
//         xfbml: true,
//       });
//     };
//
    $scope.getMyLastName = function() {
      faceBookFact.getMyLastName()
        .then(function(response) {
          console.log("Wtf?");
        });
    };
//
    $scope.getMyLastName();

    $http.get( '/api/user' );
//
  } );
