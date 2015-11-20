(function() {
  'use strict';

  angular
    .module('arAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/tmpl.login.html',
        controller: 'LoginController',
        controllerAs: 'LoginCtrl'
      })
      .state('li', {
        url: '/app',
        templateUrl: '<ui-view flex layout="column" />',
        // controller: 'AccountController',
        // controllerAs: 'account',
        abstract: true,
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "CurrentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$waitForAuth();
          }]
        }
      });

    // $urlRouterProvider.otherwise('/app/matchups/index');
    $urlRouterProvider.otherwise('/login');
  }

})();
