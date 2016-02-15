(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController ($log, $state, Auth) {

    var vm = this;

    vm.loginWithPassword = function () {
      Auth.$authWithPassword(vm.user)
      .then(function (authData) {
        _slaask.identify(authData.password.email, {
           user_id: authData.uid,
           email: authData.password.email,
       });
        $state.go('li.matchups.index');
      })
      .catch( function (error) {
        $log.error('Error: ' + error);
      });
    }


  }

})();
