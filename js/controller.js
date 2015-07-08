(function () {
  'use strict';
  angular
    .module('craftyCart')
    .controller('MainController', function ($scope, ProductsService, $routeParams) {
      ProductsService.getProducts().then(function (products) {
        $scope.products = products;
      });

      ProductsService.getProduct($routeParams.productId).then(function (product) {
        $scope.getProduct = product;
      });

    })
    .controller('CartController', function ($scope, CartService) {
      CartService.getCart().success(function (cart) {
        $scope.cart = cart;
      });

      $scope.addProduct = function (product) {
        CartService.addProduct(product);
      };


    });


})();
