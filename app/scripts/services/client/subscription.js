'use strict';

var client = angular.module('lelylan.client.subscription', []);

client.factory('Subscription', ['$http', '$window', 'lelylan.client.config', function($http, $window, config) {

  var service = {};
  var credentials = {};
  var base = config.endpoint + '/subscriptions';


  service.find = function(id) {
    return $http.get(base + '/' + id, { headers: headers() });
  }

  service.all = function(params) {
    return $http.get(base, { params: params, headers: headers() });
  }

  service.create = function(params) {
    return $http.post(base, params, { headers: headers() });
  }

  service.update = function(id, params) {
    return $http.put(base + '/' + id, params, { headers: headers() });
  }

  service.delete = function(id) {
    return $http.delete(base + '/' + id, { headers: headers() });
  }


  service.auth = function(params) {
    credentials = params;
  }

  var headers = function() {
    return { 'Authorization': 'Basic ' + encode(credentials) };
  }

  var encode = function(credentials) {
    return $window.btoa(credentials.clientId + ':' + credentials.clientSecret);
  }

  return service;
}]);
