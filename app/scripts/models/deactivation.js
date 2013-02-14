'use strict';

// TODO Activation and deactivation must be in the same class the only problem is
// that we should make a personalized http call

var model = angular.module('lelylan.deactivation', ['ngResource'])

model.factory('Deactivation', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {

  var resource = $resource(
    config.endpoint + '/activations/:activationCode',
    { activationCode: '@activation_code'},
    { execute: { method: 'DELETE' } } );

  return RequestWrapper.wrap(resource, ['execute']);
}]);
