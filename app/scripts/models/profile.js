'use strict';

var model = angular.module('lelylan.profile', ['ngResource'])

model.factory('Profile', ['RequestWrapper', '$resource', 'lelylan.config',
  function(RequestWrapper, $resource, config) {
    var resource = $resource(config.endpoint + '/me');
    return RequestWrapper.wrap(resource, ['get']);
}]);
