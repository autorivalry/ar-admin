// http://developer.edmunds.com/api-documentation/vehicle/spec_style/v2/

(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Specs', Specs);

  /** @ngInject */
  function Specs ($log, $http) {
    return {
      getById: function (api_key, style_id, params) {
        var params = angular.merge(params, { api_key: api_key, fmt: 'json', });
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id;
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      }
    }
  }

})();
