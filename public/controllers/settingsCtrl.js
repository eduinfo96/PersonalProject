angular.module( 'movieMe' )
  .controller( 'settingsCtrl', function( $scope, mainServ ){
    $scope.select = {}


    $scope.updatePrefs = () => {
      const Preferences = {
          age_range: $scope.select.age_range
          , gender: $scope.select.gender
      }

      mainServ.updatePrefs( Preferences, mainServ.user._id ).then( updatedUser => {
        console.log(updatedUser)
      })
    }

  } )
