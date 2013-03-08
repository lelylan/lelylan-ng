'use strict';

var client = angular.module('lelylan.basicRequestWrapper', ['ngResource'])

client.factory('BasicRequestWrapper', ['BasicAuth', 'Base64', '$http', function(BasicAuth, Base64, $http) {
  var requestWrapper = {};

  requestWrapper.wrap = function(resource, actions, options) {
    var wrappedResource = resource;
    for (var i=0; i < actions.length; i++) { request(wrappedResource, actions[i]); };
    return wrappedResource;
  };

  var request = function(resource, action) {
    resource['_' + action] = resource[action];

    resource[action] = function(params, data, success, error) {
      (BasicAuth.get().clientID && BasicAuth.get().clientSecret) ? setAuthorizationHeader() : deleteAuthorizationHeader();
      return resource['_' + action].call(this, params, data, success, error);
    };
  };

  var setAuthorizationHeader = function() {
    var basic = BasicAuth.get();
    $http.defaults.headers.common['Authorization'] = Base64.encode(basic.clientID + ':' + basic.clientSecret);
  };

  var deleteAuthorizationHeader = function() {
    delete $http.defaults.headers.common['Authorization']
  };

  return requestWrapper;
}]);
