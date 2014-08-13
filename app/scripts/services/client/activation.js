'use strict';

var client = angular.module('lelylan.client.activation', []);

client.factory('Activation', [
  '$http',
  'lelylanClientConfig',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/activations';


  service.activate = function(params, _options) {
    var options = { headers: Utils.headers() };
    return $http.post(base, params, Utils.merge(options, _options));
  }

  service.deactivate = function(id, _options) {
    var options = { headers: Utils.headers() };
    return $http.delete(base + '/' + id, Utils.merge(options, _options));
  }

  return service;
}]);
