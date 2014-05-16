'use strict';

var client = angular.module('lelylan.client.category', []);

client.factory('Category', ['$http', 'lelylan.client.config', function($http, config) {

  var service = {};
  var base = config.endpoint + '/categories';

  service.query = function(params) {
    return $http.get(base, { params: params });
  }

  return service;
}]);
