'use strict';

var client = angular.module('lelylan.client.property', []);

client.factory('Property', ['$http', 'lelylan.client.config', function($http, config) {

  var service = {};
  var base = config.endpoint + '/properties';


  service.find = function(id) {
    return $http.get(base + '/' + id);
  }

  service.all = function(params) {
    return $http.get(base, { params: params });
  }

  service.public = function(params) {
    return $http.get(base + '/public', { params: params });
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
