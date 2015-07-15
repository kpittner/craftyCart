(function () {
  'use strict';
  angular
  .module('cart', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myCart', {
        templateUrl: 'cart/views/list.html',
        controller: 'CartController'
      })
      // .otherwise({
      //   redirectTo: '/404'
      // });
    })

})();
