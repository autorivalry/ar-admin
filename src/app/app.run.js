(function() {
  'use strict';

  angular
    .module('arAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {

    var vm = new Object;
    $log.debug('runBlock end');

    //
    vm.on = $rootScope.$on();
    vm.on("$stateChangeError", function($log, event, toState, toParams, fromState, fromParams, error) {
      // throw the error
      $log.error(error);

      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });

  }

})();
