'use strict';

var client = angular.module('lelylan.client.utils', []);

client.factory('LelylanClientUtils', ['AccessToken', function(AccessToken) {

  var service = {};

  service.headers = function() {
    return AccessToken.get() ? { Authorization: 'Bearer ' + AccessToken.get().access_token } : {}
  }

  service.merge = function(object1, object2) {
    for (var attrname in object2) { object1[attrname] = object2[attrname]; }
    return object1
  }

  return service;
}]);
