'use strict';

var client = angular.module('lelylan.client.device', []);

client.factory('Device', [
  '$http',
  'lelylanClientConfig',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/devices';


  service.find = function(id, _options) {
    var options = { headers: Utils.headers() };
    return $http.get(base + '/' + id, Utils.merge(options, _options));
  }

  service.all = function(params, _options) {
    var options = { params: params, headers: Utils.headers() };
    return $http.get(base, Utils.merge(options, _options));
  }

  service.privates = function(id, _options) {
    var options = { headers: Utils.headers() };
    return $http.get(base + '/' + id + '/privates', Utils.merge(options, _options));
  }

  service.create = function(params, _options) {
    var options = { headers: Utils.headers() };
    return $http.post(base, params, Utils.merge(options, _options));
  }

  service.update = function(id, params, _options) {
    var options = { headers: Utils.headers() };
    return $http.put(base + '/' + id, params, Utils.merge(options, _options));
  }

  service.delete = function(id, _options) {
    var options = { headers: Utils.headers() };
    return $http.delete(base + '/' + id, Utils.merge(options, _options));
  }

  service.properties = function(id, params, _options) {
    var options = { headers: Utils.headers() };
    return $http.put(base + '/' + id + '/properties', params, Utils.merge(options, _options));
  }

  return service;
}]);
