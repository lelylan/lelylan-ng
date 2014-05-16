'use strict';

var client = angular.module('lelylan.client.type', []);

client.factory('Type', ['$http', 'lelylan.client.config', function($http, config) {

  var service = {};
  var base = config.endpoint + '/types';


  service.find = function(id) {
    return $http.get(base + '/' + id);
  }

  service.query = function(params) {
    return $http.get(base, { params: params });
  }

  service.create = function(params) {
    return $http.post(base, params);
  }

  service.update = function(id, params) {
    return $http.put(base + '/' + id, params);
  }

  service.delete = function(id) {
    return $http.delete(base + '/' + id);
  }

  return service;
}]);
