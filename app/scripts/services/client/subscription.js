'use strict';

var client = angular.module('lelylan.client.subscription', []);

client.factory('Subscription', ['$http', '$window', 'LelylanClientUtils', 'lelylanClientConfig', function($http, $window, Utils, config) {

  var service = {};
  var credentials = {};
  var base = config.endpoint + '/subscriptions';


  service.find = function(id, _options) {
    var options = { headers: headers() };
    return $http.get(base + '/' + id, Utils.merge(options, _options));
  }

  service.all = function(params, _options) {
    var options = { params: params, headers: headers() };
    return $http.get(base, Utils.merge(options, _options));
  }

  service.create = function(params, _options) {
    var options = { headers: headers() };
    return $http.post(base, params, Utils.merge(options, _options));
  }

  service.update = function(id, params, _options) {
    var options = { headers: headers() };
    return $http.put(base + '/' + id, params, Utils.merge(options, _options));
  }

  service.delete = function(id, _options) {
    var options = { headers: headers() };
    return $http.delete(base + '/' + id, Utils.merge(options, _options));
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
