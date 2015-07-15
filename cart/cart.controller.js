(function () {
  'use strict';
  angular
    .module('cart')
    .controller('CartController', function ($scope, CartService, $location) {

      if ($location.url() === '/myCart') {
        CartService.getCart().success(function (cart) {
          $scope.carts = cart;
        })
      };

      $scope.addProduct = function (product) {
        CartService.addProduct(product);
      };

      $scope.deleteProduct = function (id) {
        console.log(id);
        CartService.deleteProduct(id);
      };

      $scope.cartTotal = function (carts) {
        CartService.cartTotal(carts);
      }

      var watchCallback = function (carts) {
        CartService.getCart().success(function (cart) {
          $scope.carts = cart;
        });
      }


      $scope.$on("product:deleted", watchCallback);
      $scope.$on("product:added", watchCallback);

    });
})();
