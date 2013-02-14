'use strict';

var client = angular.module('lelylan.profile', ['ngResource'])

client.factory('Profile', ['RequestWrapper', '$resource', 'lelylan.config',
  function(RequestWrapper, $resource, config) {
    var resource = $resource(config.endpoint + '/me');
    return RequestWrapper.wrap(resource, ['get']);
}]);
