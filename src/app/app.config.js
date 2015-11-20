(function() {
  'use strict';

  angular
    .module('arAdmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // setup icons
    // $mdIconProvider.defaultIconSet(url, [viewBoxSize]);

    // theming
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('deep-purple')
      .backgroundPalette('grey');


    $mdThemingProvider.theme('white-bg', 'default')
      .backgroundPalette('blue-grey');
  }

})();
