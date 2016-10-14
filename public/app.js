angular.module( "movieMe", [ 'ui.router' ] )

    .config( function( $stateProvider, $urlRouterProvider ){
      $urlRouterProvider.otherwise('/')
      $stateProvider
        .state( "Login", {
          url: "/"
          , templateUrl: "./views/login.html"
          , controller: "mainCtrl"
        })
        .state( "Home", {
          url: "/home"
          , templateUrl: "./views/home.html"
        })

    })