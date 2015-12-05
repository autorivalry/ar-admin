// http://developer.edmunds.com/api-documentation/vehicle/spec_style/v2/

(function() {
  'use strict';

  angular
    .module('EdmundsAPI')
    .factory('Specs', Specs);

  /** @ngInject */
  function Specs ($log, $http) {
    return {
      getEquipmentById: function (api_key, style_id, params) {
        params = angular.merge(params, { api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/equipment';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getEnginesById: function (api_key, style_id, params) {
        params = angular.merge(params, {api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/engines';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getTransmissionsById: function (api_key, style_id, params)  {
        params = angular.merge(params, {api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/transmissions';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getColorsById: function (api_key, style_id, params)  {
        params = angular.merge(params, {api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/colors';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      },
      getOptionsById: function (api_key, style_id, params)  {
        params = angular.merge(params, {api_key: api_key, fmt: 'json'});
        var url = 'https://api.edmunds.com/api/vehicle/v2/styles/' + style_id + '/options';
        return $http({
          method: 'GET',
          url: url,
          params: params
        });
      }
    }
  }

})();
