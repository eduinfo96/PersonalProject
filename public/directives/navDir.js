angular.module( "movieMe" )
.directive( "navDir", function(){
  return {
    templateUrl: "./directives/nav.html"
    , controller: function( $scope, mainServ ){
      $scope.logMeOut = function(){
        mainServ.logMeOut()
      }

    }

  }

});
