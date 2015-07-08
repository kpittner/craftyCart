(function () {
  'use strict';
  angular
    .module('products')
    .controller('ProductsController', function ($scope, ProductsService, $routeParams) {
      ProductsService.getProducts().then(function (products) {
        $scope.products = products;
      });
      if ($routeParams.productId) {
      ProductsService.getProduct($routeParams.productId).then(function (product) {
        $scope.product = product;
      });
    }

    $scope.deleteProduct = function (product) {
      CartService.deleteProduct(product)
      $scope.reloadRoute = function() {
         $route.reload();
          }
    };

  });
})();
