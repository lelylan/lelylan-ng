'use strict';

var client = angular.module('lelylan.activation', ['ngResource'])

client.factory('Activation', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/activations',
    { },
    { execute: { method: 'POST' } } );

  return RequestWrapper.wrap(resource, ['execute']);
}]);
