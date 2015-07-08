(function () {
  'use strict';
  angular
    .module('cart')
    .controller('CartController', function ($scope, CartService, $location) {

      if ($location.url() === '/myCart') {
        CartService.getCart().success(function (cart) {
          $scope.cart = cart;
        })
      };

      $scope.addProduct = function (product) {
        CartService.addProduct(product);
        $scope.reloadRoute = function() {
           $route.reload();
            }
      };

      $scope.deleteProduct = function (product) {
        CartService.deleteProduct(product)
        $scope.reloadRoute = function() {
           $route.reload();
            }
      };


    });
})();
