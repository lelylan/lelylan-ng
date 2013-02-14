'use strict';

var model = angular.module('lelylan.history', ['ngResource'])

model.factory('History', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/histories/:id',
    { id: '@id' } );

  return RequestWrapper.wrap(resource, ['get', 'query']);
}]);
