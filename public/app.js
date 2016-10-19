angular.module( "movieMe", [ 'ui.router', 'ui.materialize' ] )

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
          , controller: 'homeCtrl'
        })
        .state( "Settings", {
          url: "/settings"
          , templateUrl: "./views/settings.html"
          , controller: "settingsCtrl"
        })
        .state( "Dates", {
          url: "/myDates"
          , templateUrl: "./views/myDates.html"
          // , controller: "datesCtrl"
        })
        .state( "Theaters", {
          url: "/theaters"
          , templateUrl: "./views/theaters.html"
          // , controller: "theatersCtrl"
        })

    })

    .constant('ref', {
      url: 'http://localhost:4001'
    })
