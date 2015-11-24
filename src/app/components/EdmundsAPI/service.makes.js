(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Makes', Makes);

  /** @ngInject */
  function Makes ($log, $http) {
    return {
      all: function(api_key, params) {
        var params = angular.merge(params, {fmt: 'json', api_key: api_key});
        // { //fmt=json&api_key={api key}&state=new&view=full
        //   // state: '',
        //   // year: '',
        //   // view: '',
        //   fmt: 'json',
        //   api_key: api_key
        // }
        return $http({
          method: 'GET',
          url: 'https://api.edmunds.com/api/vehicle/v2/makes',
          params: params
        });
      } // end all
    }
  }

})();
