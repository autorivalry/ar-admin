(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsController', MatchupsController);

  /** @ngInject */
  function MatchupsController ($log, $mdToast, $mdSticky, Makes) {

    var api_key = '2wgrfjrcmdkq9f4sxgacrhgw';
    var vm = this;
    vm.unsavedChanges = true;

    vm.loading = {
      makes: true,
      years: true,
      models: true
    };

    vm.log = function (data) {
      $log.log(data);
      $log.log('Data of type: ');
      $log.log(typeof data);
    }

    Makes.all(api_key, {state: 'new'})
      .then(function (response) {
        vm.makes = response.data.makes;
        vm.loading = false;
      }, function (response) {
        $log.error(response);
      });

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
    vm.years  = ["2015", "2016"];

  }

})();
