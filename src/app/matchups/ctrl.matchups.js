(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsController', MatchupsController);

  /** @ngInject */
  function MatchupsController ($log, $mdToast, $mdSticky) {

    var vm = this;

    vm.unsavedChanges = true;


    var unsavedToast = $mdToast.simple()
      .content('You have unsaved changes!')
      .action('save')
      .highlightAction(true)
      .position('bottom right')
      .hideDelay(false);

    $mdToast.show(
      unsavedToast
    ).then( function (response) {
      if ( response == 'ok' ) {
        $log.log('Saved the Matchup')
      }
    });

    // TODO: Load this information dynamically using the
    //       Edmunds.com API
    vm.makes  = ["Ford", "Chevrolet", "Audi", "GMC"];
    vm.years  = ["2015", "2016"];
    vm.models = ["Terrain", "Corvette", "A4"];

  }

})();
