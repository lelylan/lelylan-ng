'use strict';

var client = angular.module('lelylan.history', ['ngResource'])

client.factory('History', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/histories/:id',
    { id: '@id' } );

  return RequestWrapper.wrap(resource, ['get', 'query']);
}]);
