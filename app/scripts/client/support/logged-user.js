'use strict';

var client = angular.module('lelylan.loggedUser', []);

client.factory('LoggedUser', ['$location', '$http', function($location, $http) {
  var service = {};
  var user = {};

  // Returns the access token
  service.get = function() {
    return user;
  };

  // Set the access token from the fragment URI
  service.set = function(_user) {
    return user = _user;
  };

  return service;
}]);
