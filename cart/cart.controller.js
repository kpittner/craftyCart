(function () {
  'use strict';
  angular
    .module('cart')
    .controller('CartController', function ($scope, CartService, $location) {

      if ($location.url() === '/myCart') {
        CartService.getCart().success(function (cart) {
          $scope.carts = cart;
          $scope.$broadcast(cart);
        })
      };

      $scope.addProduct = function (product) {
        CartService.addProduct(product);
      };

      $scope.deleteProduct = function (product) {
        carts.splice(carts.indexOf(product), 1);
      };

      $scope.cartTotal = function (carts) {
        CartService.cartTotal(carts);
      }

    });
})();
