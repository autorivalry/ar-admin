http://developer.edmunds.com/api-documentation/vehicle/service_safety/v2/02_by_style_id/api-description.html

(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Photos', Photos);

  /** @ngInject */
  function Photos ($log, $http) {
    return {
      getRatingsById: function (api_key, style_id, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/media/v2/styles/' + style_id + '/safety';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getRatingsByModelYear: function (api_key, vehicle_make, vehicle_model, vehicle_year, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/media/v2/' + vehicle_make + '/' + vehicle_model + '/' + vehicle_year + '/safety';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      }
    }
  }

})();
