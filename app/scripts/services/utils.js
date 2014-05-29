'use strict';

var client = angular.module('lelylan.client.utils', []);

client.factory('LelylanClientUtils', ['AccessToken', function(AccessToken) {

  var service = {};

  service.headers = function() {
    return { Authorization: 'Bearer ' + AccessToken.get().access_token };
  }

  return service;
}]);
