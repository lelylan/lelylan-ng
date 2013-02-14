'use strict';

var model = angular.module('lelylan.requestWrapper', ['ngResource']);

model.factory('RequestWrapper', ['AccessToken', 'ImplicitFlow', '$http', function(AccessToken, ImplicitFlow, $http) {
  var requestWrapper = {};
  var token;

  requestWrapper.wrap = function(resource, actions, options) {
    token = AccessToken.initialize();
    var wrappedResource = resource;
    for (var i=0; i < actions.length; i++) { request(wrappedResource, actions[i]); };
    return wrappedResource;
  };

  var request = function(resource, action) {
    resource['_' + action] = resource[action];

    resource[action] = function(params, data, success, error) {
      (AccessToken.get().access_token) ? setAuthorizationHeader() : deleteAuthorizationHeader();
      if (token.expires_at && token.expires_at < new Date()) window.location.replace(ImplicitFlow.url());
      return resource['_' + action].call(this, params, data, success, error);
    };
  };

  var setAuthorizationHeader = function() {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
  };

  var deleteAuthorizationHeader = function() {
    delete $http.defaults.headers.common['Authorization']
  };

  return requestWrapper;
}]);
