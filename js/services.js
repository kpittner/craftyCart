(function () {
  'use strict';
  angular
    .module('craftyCart')
    .factory('ProductsService', function ($http) {

      var urlOpts = {
        baseUrl: 'https://openapi.etsy.com/v2/listings/active.js?',
        apiKey: 'tnaz2je0w5seue0pt3wlwq4j',
        includes: 'MainImage',
        buildUrl: function (keywords) {
          return this.baseUrl + 'includes=' + this.includes + '&keywords=frogs' +
          '&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
        }
      };

      var mapDataToUrl = function (collection, keywords) {
        return _.map(collection, function (obj) {
          return {image: obj.MainImage.url_170x135, title: obj.title, id: obj.category_id, description: obj.description,
          price: obj.price, materials: obj.materials, url: obj.url};
        });
      };
//build img url in obj with title and id
      var getProducts = function () {
        return $http.jsonp(urlOpts.buildUrl()).then(function (products) {
          var craftyArr = products.data.results;
          return mapDataToUrl(craftyArr);
        });
      };

      var getProduct = function (id) {
        return $http.jsonp(urlOpts.buildUrl()).then(function (products) {
          var narrowedDownArr = products.data.results;
            return mapDataToUrl(narrowedDownArr);
        });
      };

      return {
        getProducts: getProducts,
        getProduct: getProduct
      };

    })
    .factory('CartService', function ($http) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/craftyCart';
      var addProduct = function (product) {
        $http.post(ur, product).success(function (resp) {
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
        getCart: getCart
      };
    });
})();
