'use strict';

var client = angular.module('lelylan.client.device', []);

client.factory('Device', [
  '$http',
  'lelylan.client.config',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/devices';


  service.find = function(id) {
    return $http.get(base + '/' + id, { headers: Utils.headers() });
  }

  service.all = function(params) {
    return $http.get(base, { params: params, headers: Utils.headers() });
  }

  service.privates = function(id) {
    return $http.get(base + '/' + id + '/privates', { headers: Utils.headers() });
  }

  service.create = function(params) {
    return $http.post(base, params, { headers: Utils.headers() });
  }

  service.update = function(id, params) {
    return $http.put(base + '/' + id, params, { headers: Utils.headers() });
  }

  service.delete = function(id) {
    return $http.delete(base + '/' + id,  { headers: Utils.headers() });
  }

  service.properties = function(id, params) {
    return $http.put(base + '/' + id + '/properties', params,  { headers: Utils.headers() });
  }

  return service;
}]);
