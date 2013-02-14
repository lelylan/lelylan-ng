'use strict';

var model = angular.module('lelylan.activation', ['ngResource'])

model.factory('Activation', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/activations',
    { },
    { execute: { method: 'POST' } } );

  return RequestWrapper.wrap(resource, ['execute']);
}]);
