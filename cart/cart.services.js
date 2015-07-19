(function () {
  'use strict';
  angular
    .module ('cart')
    .factory('CartService', function ($http, $rootScope) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/CraftyCarts';
      var addProduct = function (product) {
        $http.post(url, product).success(function () {
          $rootScope.$broadcast("product:added");
        });
      }

      var deleteProduct = function (id) {
        $http.delete(url + '/' + id).success(function () {
          $rootScope.$broadcast("product:deleted");
        });
      }

      var cartTotal = function (products) {
        var total = 0;
        for (var i = 0; i < products.length; i++) {
          var item = products[i];
          total += (+item.price);
        }
        return total;
        $rootScope.$broadcast("price:updated");
      }

      var getCart = function () {
        return $http.get(url);
      }

      return {
        cartTotal: cartTotal,
        addProduct: addProduct,
        deleteProduct: deleteProduct,
        getCart: getCart
      };
    });
})();
