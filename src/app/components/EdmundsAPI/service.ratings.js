// http://developer.edmunds.com/api-documentation/vehicle/spec_style/v2/
https://api.edmunds.com/api/vehiclereviews/v2/styles/200701955?api_key=2wgrfjrcmdkq9f4sxgacrhgw&fmt=json

(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Ratings', Ratings);

  /** @ngInject */
  function Ratings ($log, $http) {
    return {
      getRatingsById: function (api_key, style_id, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/grade';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getReviewsById: function (api_key, style_id, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehiclereviews/v2/styles/' + style_id;
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getReviewsByModelYear: function (api_key, vehicle_make, vehicle_model, vehicle_year, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehiclereviews/v2/' + vehicle_make + '/' + vehicle_model + '/' + vehicle_year;
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      }
    }
  }

})();
