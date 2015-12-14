(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsController', MatchupsController);

  /** @ngInject */
  function MatchupsController (CurrentAuth, $log, $mdToast, $mdSticky, Matchups, Makes, Styles, Specs, Ratings, Photos, Safety) {

    var api_key = '2wgrfjrcmdkq9f4sxgacrhgw';
    var vm = this;
    vm.styles = new Object;
    var toastDeployed = false;
    var savedMatchup = false;

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
      } else if (angular.isUndefined(data)) {
        $log.error('Expects data param of type object. Recieved: ' + typeof data);
      } else if (angular.isUndefined(vehicle)) {
        $log.error('Expects vehicle parameter of type string. Recieved: ' + typeof vehicle);
      }
    }

    vm.updateSpecs = function (data, vehicle) {
      if (angular.isDefined(data)) {

        Styles.getDetailsById(api_key, data.id, { view: 'full'})
          .then(function (success) {
            vm[vehicle].detail = success.data;
            $log.log(vehicle + ' details loading...');
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          });

        Specs.getEquipmentById(api_key, data.id, {})
          .then(function (success) {
            vm[vehicle].equipment = success.data;
            $log.log(vehicle + ' equipment loading...');
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          });

        Ratings.getRatingsById(api_key, data.id, {})
          .then(function (success) {
            vm[vehicle].ratings = success.data;
            $log.log(vehicle + ' ratings loading...')
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          });

        Ratings.getReviewsByModelYear(api_key, data.make.niceName, data.model.niceName, data.year.year, {})
          .then(function (success) {
            vm[vehicle].reviews = success.data;
            $log.log(vehicle + ' reviews loading...')
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error);
          })

        Safety.getRatingsByModelYear(api_key, data.make.niceName, data.model.niceName, data.year.year, {})
          .then(function (success) {
            vm[vehicle].safety = success.data;
            $log.log(vehicle + ' safety loading...')
            $log.log(vm[vehicle]);
          }, function (error) {
            $log.error(error)
          });

        // Photos.getPhotosByModelYear(api_key, data.make.niceName, data.model.niceName, data.year.year, {})
        //   .then(function (success) {
        //     vm[vehicle].photos = success.data;
        //     $log.log(vehicle + ' photos loading...')
        //     $log.log(vm[vehicle]);
        //   }, function (error) {
        //     $log.error(error);
        //   })
        vm.saveChanges(vm.matchup);
      } // end if
    }

    var unsavedToast = $mdToast.simple()
      .content('You have unsaved changes!')
      .action('save')
      .highlightAction(true)
      .position('bottom right')
      .hideDelay(false);


    // TODO: this should probably be a service
    // vm.saveChanges = function (data, function) {}
    vm.saveChanges = function (data) {
      if (toastDeployed === false) {
        // the toast isn't displayed. Deploy the toast!
        $log.log('Toast is not deployed');
        toastDeployed = true;
        $mdToast.show(
          unsavedToast
        ).then( function (response) {
          if ( response == 'ok' ) {
            saveMatchup();
            $log.log('Saved the Matchup');
            // $log.log(CurrentAuth);
            toastDeployed = false;
          }
        });

      } else {
        // the toast is already showing. Update the toast!
        $log.log('Toast is already deployed');
      }
    }

    var saveMatchup = function () {
      // if vm.matchup has an id
      // then it is already saved to firebase and we can update it
      if (savedMatchup) {
        $log.log('Updated the matchup instead of a new save')
      // otherwise we have never saved the vm.matchup object before
      // and should add it to the array
      } else {
        Matchups.$array
          .$add(_.merge(vm.matchup, {"uid": CurrentAuth.uid }))
          .then( function (ref) {
            savedMatchup = ref.key();
            $log.log('Saved matchup with id = ' + savedMatchup);
          }, function (error) {
            $log.error(error);
          })
      }
    }

  }

})();
