'use strict';

var client = angular.module('lelylan.client.function', []);

client.factory('Function', [
  '$http',
  'lelylanClientConfig',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/functions';


  service.find = function(id, _options) {
    var options = { headers: Utils.headers() };
    return $http.get(base + '/' + id, Utils.merge(options, _options));
  }

  service.all = function(params, _options) {
    var options = { params: params, headers: Utils.headers() };
    return $http.get(base, Utils.merge(options, _options));
  }

  service.public = function(params, _options) {
    var options = { params: params };
    return $http.get(base + '/public', Utils.merge(options, _options));
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

  return service;
}]);
