'use strict';

var client = angular.module('lelylan.client.category', []);

client.factory('Category', [
  '$http',
  'lelylan.client.config',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/categories';

  service.all = function(params) {
    return $http.get(base, { params: params, headers: Utils.headers() });
  }

  return service;
}]);
