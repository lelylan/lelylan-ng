'use strict';

var client = angular.module('lelylan.client.device', []);

client.factory('Device', ['$http', 'lelylan.client.config', function($http, config) {

  var service = {};
  var base = config.endpoint + '/devices';


  service.find = function(id) {
    return $http.get(base + '/' + id);
  }

  service.all = function(params) {
    return $http.get(base, { params: params });
  }

  service.privates = function(id) {
    return $http.get(base + '/' + id + '/privates');
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

  service.properties = function(id, params) {
    return $http.put(base + '/' + id + '/properties', params);
  }

  return service;
}]);
