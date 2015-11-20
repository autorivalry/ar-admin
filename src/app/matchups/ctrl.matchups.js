(function() {
  'use strict';

  angular
    .module('arAdmin')
    .controller('MatchupsController', MatchupsController);

  /** @ngInject */
  function MatchupsController () {

    var vm = this;

    // TODO: Load this information dynamically using the
    //       Edmunds.com API
    vm.makes  = ["Ford", "Chevrolet", "Audi", "GMC"];
    vm.years  = ["2015", "2016"];
    vm.models = ["Terrain", "Corvette", "A4"];

  }

})();
