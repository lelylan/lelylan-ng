'use strict';

var client = angular.module('lelylan.profile', ['ngResource'])

client.factory('Profile', ['RequestWrapper', '$resource', 'lelylan.config', '$timeout',
  function(RequestWrapper, $resource, config, $timeout) {
    var me;
    var resource = $resource(config.endpoint + '/me');
    var profile  = RequestWrapper.wrap(resource, ['get']);

    return profile
}]);
