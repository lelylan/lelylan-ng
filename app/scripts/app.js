'use strict';

angular.module('lelylan.resources', [

  // configuration
  'lelylan.config',

  // error handling
  'lelylan.errors',

  // authorization
  'lelylan.accessToken',
  'lelylan.requestWrapper',
  'lelylan.basicAuth',
  'lelylan.basicRequestWrapper',
  'lelylan.implicitFlow', // TODO: move it to components

  // REST API
  'lelylan.profile',
  'lelylan.device',
  'lelylan.history',
  'lelylan.activation',
  'lelylan.deactivation',
  'lelylan.type',
  'lelylan.property',
  'lelylan.function',
  'lelylan.status',
  'lelylan.location',
  'lelylan.subscription'
]);
