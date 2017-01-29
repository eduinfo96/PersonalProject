angular.module( 'movieMe' )
  .controller( 'settingsCtrl', function( $scope, mainServ ){
    $scope.select = {}


    $scope.updatePrefs = () => {
      const data = {
        age: $scope.select.age
        , preferences:{
            age_range: $scope.select.age_range
            , gender: $scope.select.gender
          }
      }

      mainServ.updatePrefs( data, mainServ.user._id ).then( updatedUser => {
        mainServ.user = updatedUser;
        console.log( mainServ.user );
      })
    }

  } )
