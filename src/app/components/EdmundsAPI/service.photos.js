http://developer.edmunds.com/api-documentation/media/photos/v2/02_photos_by_style_id/api-description.html

(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Photos', Photos);

  /** @ngInject */
  function Photos ($log, $http) {
    return {
      getPhotosById: function (api_key, style_id, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/photos';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getPhotosByModelYear: function (api_key, vehicle_make, vehicle_model, vehicle_year, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/media/v2/' + vehicle_make + '/' + vehicle_model + '/' + vehicle_year + '/photos';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      }
    }
  }

})();
