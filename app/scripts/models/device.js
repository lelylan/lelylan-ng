'use strict';

var device = angular.module('lelylan.device', ['ngResource']);

device.factory('Device', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/devices/:id/:action',
    { id: '@id' },
    { privates:   { method: 'GET', params: { action: 'privates' } },
      update:     { method: 'PUT' },
      properties: { method: 'PUT', params: { action: 'properties' } },
      execute:    { method: 'PUT', params: { action: 'functions' } } });

  return RequestWrapper.wrap(resource, ['get', 'privates', 'query', 'save', 'update', 'delete', 'properties', 'execute']);
}]);
