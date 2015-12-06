(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsController', MatchupsController);

  /** @ngInject */
  function MatchupsController ($log, $mdToast, $mdSticky, Makes, Styles, Specs, Ratings) {

    var api_key = '2wgrfjrcmdkq9f4sxgacrhgw';
    var vm = this;
    vm.styles = new Object;

    vm.loading = {
      makes: true,
      years: true,
      models: true,
      styles: {
        hero: true,
        villain: true
      }
    };

    vm.log = function (data) {
      $log.log(data);
      $log.log('Data of type: ');
      $log.log(typeof data);
    }

    Makes.all(api_key, {state: 'new'})
      .then(function (success) {
        vm.makes = success.data.makes;
        vm.loading.makes = false;
      }, function (error) {
        $log.error(error);
      });

    vm.updateStyles = function (data, vehicle) {
      if (angular.isDefined(data) && angular.isDefined(vehicle)) {
        Styles.getByModelYear(api_key, data.make.name, data.model.name, data.year.year, {})
          .then(function (success) {
            if (vehicle === 'hero') {
              vm.styles.hero = success.data;
              vm.loading.styles.hero = false;
            } else if (vehicle === 'villain') {
              vm.styles.villain = success.data;
              vm.loading.styles.villain = false;
            } else {
              $log.error('Invalid vehicle parameter. Expected "hero" or "villain", received ' + vehicle);
            }
          }, function (error) {
            $log.error(error);
          });
      } else if (!angular.isDefined(data)) {
        $log.error('Expects data param of type object. Recieved: ' + typeof data);
      } else if (!angular.isDefined(vehicle)) {
        $log.error('Expects vehicle parameter of type string. Recieved: ' + typeof vehicle);
      }
    }

    vm.updateSpecs = function (data, vehicle) {
      if (angular.isDefined(data)) {

        $log.log(vehicle + ' details loading...');
        Styles.getDetailsById(api_key, data.id, { view: 'full'})
          .then(function (success) {
            vm[vehicle].detail = success.data;
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          });

        $log.log(vehicle + ' equipment loading...');
        Specs.getEquipmentById(api_key, data.id, {})
          .then(function (success) {
            vm[vehicle].equipment = success.data;
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          });

        $log.log(vehicle + ' ratings loading...')
        Ratings.getRatingsById(api_key, data.id, {})
          .then( function (success) {
            vm[vehicle].ratings = success.data;
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          });

      } // end if
    }

    var unsavedToast = $mdToast.simple()
      .content('You have unsaved changes!')
      .action('save')
      .highlightAction(true)
      .position('bottom right')
      .hideDelay(false);

    vm.saveChanges = function (data) {
      $log.log(data);
      $mdToast.show(
        unsavedToast
      ).then( function (response) {
        if ( response == 'ok' ) {
          $log.log('Saved the Matchup')
        }
      });
    }

  }

})();
