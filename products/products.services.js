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
          console.log(obj);
          return {image: obj.MainImage.url_170x135, title: obj.title, id: obj.category_id, description: obj.description,
          price: obj.price, materials: obj.materials, url: obj.url};
        });
      };


      var getProducts = function () {
        var deferred = $q.defer();
        var cache = cacheEngine.get('products');
        if (cache) {
          deferred.resolve(cache);
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            var craftyArr = products.data.results;
            console.log(craftyArr);
            cacheEngine.put('products', (mapDataToUrl(craftyArr)));
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
          deferred.resolve(_.where(cache, {id: id})[0]);
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            var narrowedDownArr = _.where(products.data.results, {id: id});
            console.log(narrowedDownArr);
              deferred.resolve(mapDataToUrl(narrowedDownArr)[0]);
          });
        }
        return deferred.promise;
      };

      return {
        getProducts: getProducts,
        getProduct: getProduct
      };

    })

})();
