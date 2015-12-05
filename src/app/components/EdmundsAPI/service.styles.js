// http://developer.edmunds.com/api-documentation/vehicle/spec_style/v2/

(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Styles', Styles);

  /** @ngInject */
  function Styles ($log, $http) {
    return {
      getByModelYear: function (api_key, vehicle_make, vehicle_model, vehicle_year, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json' });
        var url = 'https://api.edmunds.com/api/vehicle/v2/' + vehicle_make + '/' + vehicle_model + '/' + vehicle_year + '/styles';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getDetailsById: function (api_key, style_id, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json' });
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id;
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      }
    };
  }

})();
