(function () {
  'use strict';
  angular
  .module('craftyCart', [
    'ngRoute',
    'underscore',
    'products',
    'cart'
    // 'bootstrap'
    // 'moment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/404'
      });
  });
  angular
    .module('underscore', [])
    .factory('_', function ($window) {
      return $window._;
    });
  // angular
  //   .module('bootstrap', ['ui.bootstrap'])
  //   .factory('bootstrap', function ($window) {
  //     return $window.bootstrap;
  //   });
  // angular
  //   .module('moment', [])
  //   .factory('moment', function ($window) {
  //     return $window.moment;
  //   });

})();
