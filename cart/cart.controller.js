(function () {
  'use strict';
  angular
    .module('cart')
    .controller('CartController', function ($scope, CartService, $location) {

      if ($location.url() === '/myCart') {
        CartService.getCart().success(function (cart) {
          console.log("Test:", cart)
          $scope.carts = cart;
        }).then(function(carts) {
          var total = CartService.cartTotal(carts.data);
          $scope.totalPrice = total;
        });
      };

      $scope.addProduct = function (product) {
        CartService.addProduct(product);
      }

      $scope.deleteProduct = function (id) {
        console.log(id);
        CartService.deleteProduct(id);
      }

      var watchCallback = function (carts) {
        CartService.getCart().success(function (cart) {
          $scope.carts = cart;
        });
      }

      $scope.$on("price:updated", watchCallback);
      $scope.$on("product:added", watchCallback);
      $scope.$on("product:deleted", watchCallback);

    });
})();
