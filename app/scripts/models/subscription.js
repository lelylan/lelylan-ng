'use strict';

var model = angular.module('lelylan.subscription', ['ngResource'])

model.factory('Subscription', ['BasicRequestWrapper', '$resource', 'lelylan.config', function(BasicRequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/subscriptions/:id',
    { id: '@id' },
    { update: { method: 'PUT' } } );

  return BasicRequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);
