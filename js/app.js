(function () {
  'use strict';


  angular
  .module('craftyCart', [
    'ngRoute',
    'underscore',
    // 'moment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/myCart', {
        templateUrl: 'views/myCart.html',
        controller: 'CartController'
      })
      .when('/detail/:photoId', {
        templateUrl: 'views/details.html',
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
  //   .module('moment', [])
  //   .factory('moment', function ($window) {
  //     return $window.moment;
  //   });

})();
