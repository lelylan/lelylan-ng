'use strict';

var client = angular.module('lelylan.client.activation', []);

client.factory('Activation', [
  '$http',
  'lelylan.client.config',
  'LelylanClientUtils',

  function($http, config, Utils) {

  var service = {};
  var base = config.endpoint + '/activations';


  service.activate = function(params) {
    return $http.post(base, params, { headers: Utils.headers() });
  }

  service.deactivate = function(id) {
    return $http.delete(base + '/' + id, { headers: Utils.headers() });
  }

  return service;
}]);
