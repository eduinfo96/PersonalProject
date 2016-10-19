angular.module( 'movieMe' )
  .controller( 'settingsCtrl', function( $scope, mainServ, $rootScope ){
    $scope.select = {}


    $scope.updatePrefs = () => {
      const Preferences = {
          age_range: $scope.select.age_range
          , gender: $scope.select.gender
          , time_range: $scope.select.time_range
      }

      mainServ.updatePrefs( Preferences, $rootScope.user._id ).then(function( updatedUser ){
        console.log(updatedUser)
      })
    }


  } )
