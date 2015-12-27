(function() {
  'use strict';

  angular
    .module('arAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $mdToast) {

    var vm = new Object;
    $log.debug('runBlock end');

    // TODO: Why isn't this working?
    // vm.on = $rootScope.$on();
    // vm.on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
    //   // throw the error
    //   $log.error(error);
    //
    //   // We can catch the error thrown when the $requireAuth promise is rejected
    //   // and redirect the user back to the home page
    //   if (error === "AUTH_REQUIRED") {
    //     $state.go("login");
    //   }
    // });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      // throw the error
      $log.error(error);

      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });

    // TODO: Why isn't this working?
    // vm.on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, error) {
    //   $mdToast.cancel();
    // });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, error) {
      $mdToast.cancel()
        .then( function (response) {
          $rootScope.toastDeployed = false;
        });
    })

  }

})();
