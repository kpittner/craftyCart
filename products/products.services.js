(function () {
  'use strict';
  angular
    .module ('products')
    .factory('ProductsService', function ($http, _, $q, $cacheFactory) {

      var cacheEngine = $cacheFactory('products') ;

      var urlOpts = {
        baseUrl: 'https://openapi.etsy.com/v2/listings/active.js?includes=MainImage&keywords=frogs&api_key=',
        apiKey: 'tnaz2je0w5seue0pt3wlwq4j',
        callback: '&callback=JSON_CALLBACK',
        buildUrl: function(){
          return this.baseUrl + this.apiKey + this.callback;
        }
      };

      var mapDataToUrl = function (collection, keywords) {
        return _.map(collection, function (obj) {
          console.log(obj.listing_id);
          return {imageSmall: obj.MainImage.url_75x75, imageMed: obj.MainImage.url_170x135, imageLarge: obj.MainImage.url_570xN, title: obj.title, id: obj.listing_id, description: obj.description,
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
        console.log(id);
        var deferred = $q.defer();
        var cache = cacheEngine.get('products');
        if (cache) {
          console.log('single photo cache');
          deferred.resolve(_.where(cache, {id: id}));
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            console.log('products: ', _.where(products.data.results, {listing_id: +id}));
            var narrowedDownArr = _.where(products.data.results, {listing_id: +id});
            console.log('narrowed down: ', narrowedDownArr);
              deferred.resolve(mapDataToUrl(narrowedDownArr)[0]);
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
        getProduct: getProduct,
        deleteProduct: deleteProduct
      };


      var searchAny = element(by.model('search.$'));
      searchAny.clear();
      searchAny.sendKeys('i');

    })

})();
