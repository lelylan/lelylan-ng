'use strict';

var client = angular.module('lelylan.client.category', []);

client.factory('Category', [
  '$http',
  'lelylanClientConfig',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/categories';

  service.all = function(params, _options) {
    var options = { params: params, headers: Utils.headers() };
    return $http.get(base, Utils.merge(options, _options));
  }

  return service;
}]);
