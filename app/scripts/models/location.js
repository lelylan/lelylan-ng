'use strict';

var model = angular.module('lelylan.location', ['ngResource']);

model.factory('Location', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/locations/:id',
    { id: '@id' },
    { update: { method: 'PUT' } } );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);
