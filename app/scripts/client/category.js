'use strict';

var client = angular.module('lelylan.category', ['ngResource']);

client.factory('Category', ['RequestWrapper', '$resource', 'lelylan.config', function(RequestWrapper, $resource, config) {
  var resource = $resource(config.endpoint + '/categories');
  return RequestWrapper.wrap(resource, ['query']);
}]);
