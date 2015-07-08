(function () {
  'use strict';
  angular
  .module('products', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/products', {
      templateUrl: 'products/views/list.html',
      controller: 'ProductsController'
    })
    .when('/products/details/:productId', {
      templateUrl: 'products/views/details.html',
      controller: 'ProductsController'
    });


  });

})();
