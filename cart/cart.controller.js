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
      };


    });
})
