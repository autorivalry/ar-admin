(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController (Auth, CurrentAuth) {

    var vm = this;
    vm.me = CurrentAuth;
    vm.logout = function () {
      // log the user out
      Auth.$unauth();

      // then do something
    }

  }

})();
