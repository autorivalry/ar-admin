(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsIndexController', MatchupsIndexController);

  /** @ngInject */
  function MatchupsIndexController (CurrentAuth, $log, $mdDialog, Matchups) {

    var vm = this;
    vm.matchupsLoaded = false;

    vm.myMatchups = Matchups.$array.getMyMatchups();
    vm.myMatchups.$loaded().then(function () {
      vm.matchupsLoaded = true;
    });

    vm.grabCode = function (ev, id) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Grab the snippet')
          .content('<iframe src="http://render.autorivalry.com/v1/matchups/' + id + '" width="100%" min-height="700px"></iframe>')
          .ariaLabel('Tracking snippet dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    }

  }

})();
