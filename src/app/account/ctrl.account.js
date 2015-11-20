(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController (CurrentAuth) {

    var vm = this;
    vm.me = CurrentAuth;

  }

})();
