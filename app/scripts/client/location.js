'use strict';

var client = angular.module('lelylan.location', ['ngResource']);

client.factory('Location', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/locations/:id',
    { id: '@id' },
    { update: { method: 'PUT' } } );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);
