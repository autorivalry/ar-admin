(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsIndexController', MatchupsIndexController);

  /** @ngInject */
  function MatchupsIndexController (CurrentAuth, $log, Matchups) {

    var vm = this;
    vm.matchupsLoaded = false;

    vm.myMatchups = Matchups.$array.getMyMatchups();
    vm.myMatchups.$loaded().then(function () {
      vm.matchupsLoaded = true;
    });

  }

})();
