'use strict';

var client = angular.module('lelylan.client.activation', []);

client.factory('Activation', ['$http', 'lelylan.client.config', function($http, config) {

  var service = {};
  var base = config.endpoint + '/activations';


  service.activate = function(params) {
    return $http.post(base, params);
  }

  service.deactivate = function(id) {
    return $http.delete(base + '/' + id);
  }

  return service;
}]);
