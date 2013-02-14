'use strict';

var model = angular.module('lelylan.accessToken', ['ngResource']);

model.factory('AccessToken', ['$location', '$http', function($location, $http) {
  var accessToken = {};
  var token = {};

  // Returns the access token
  accessToken.get = function() {
    return token
  }

  // Set the access token from the fragment URI
  accessToken.initialize = function() {
    var hash = accessToken.parseToken();
    if (hash.access_token) accessToken.set(hash);
    if (hash.error) accessToken.set(hash);
    return token
  };

  // Set the access token
  accessToken.set = function(params) {
    angular.extend(token, params);
    setExpiresAt();
    return token;
  };

  // Remove the access token authorization header
  accessToken.delete = function() {
    token = {};
  }

  // Get the access token from the fragment URI
  accessToken.parseToken = function() {
    var result = {};
    var splitted = $location.hash().split('&');
    for (var i = 0; i < splitted.length; i++) {
      var param = splitted[i].split('=');
      var key = param[0]; var value = param[1];
      result[key] = value };

    return result;
  };

  // Set the access token expiration date (useful for refresh logics)
  var setExpiresAt = function() {
    var expires_at = new Date();
    expires_at.setSeconds(expires_at.getSeconds() + parseInt(token.expires_in) - 60); // 60 seconds less to secure browser and response latency
    token.expires_at = expires_at;
  };

  return accessToken;
}]);
