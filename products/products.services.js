(function () {
  'use strict';
  angular
    .module ('products')
    .factory('ProductsService', function ($http, _, $q, $cacheFactory) {

      var cacheEngine = $cacheFactory('products') ;

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
          console.log("Object: ", obj);
        });
      };


      var getProducts = function () {
        var deferred = $q.defer();
        var cache = cacheEngine.get('products');
        if (cache) {
          console.log('inside photo cache');
          deferred.resolve(cache);
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            var craftyArr = products.data.results;
            cacheEngine.put('products', mapDataToUrl(craftyArr));
            deferred.resolve(mapDataToUrl(craftyArr));
          });
        }
        return deferred.promise;
      };

      var getProduct = function (id) {
        var deferred = $q.defer();
        var cache = cacheEngine.get('products');
        if (cache) {
          console.log('single photo cache');
          deferred.resolve(_.where(cache, {id: id}));
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            var narrowedDownArr = _.where(products.data.results, {id: id});
            console.log(narrowedDownArr);
              deferred.resolve(mapDataToUrl(narrowedDownArr));
          });
        }
        return deferred.promise;
      };

      var deleteProduct = function (product) {
        $http.delete(url, product).success(function (resp) {
          console.log(resp);
        }).error(function (err) {
          console.log(err);
        });
      };

      return {
        getProducts: getProducts,
        deleteProduct: deleteProduct,
        getProduct: getProduct
      };

    })

})();
