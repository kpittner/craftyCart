(function () {
  'use strict';
  angular
    .module ('cart')
    .factory('CartService', function ($http) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/CraftyCarts';
      var addProduct = function (product) {
        $http.post(url, product).success(function (resp) {
          console.log(resp);
        }).error(function (err) {
          console.log(err);
        });
      };
      var deleteProduct = function (product) {
        $http.delete(url, product).success(function (resp) {
          console.log(resp);
        }).error(function (err) {
          console.log(err);
        });
      };

      var getCart = function () {
        return $http.get(url);
      }

      return {
        addProduct: addProduct,
        deleteProduct: deleteProduct,
        getCart: getCart
      };
    });
})();
