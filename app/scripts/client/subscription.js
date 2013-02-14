'use strict';

var client = angular.module('lelylan.subscription', ['ngResource'])

client.factory('Subscription', ['BasicRequestWrapper', '$resource', 'lelylan.config', function(BasicRequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/subscriptions/:id',
    { id: '@id' },
    { update: { method: 'PUT' } } );

  return BasicRequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);
