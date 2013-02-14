'use strict';

angular.module('lelylan.resources', [

  // client
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
  'lelylan.subscription',

  // authorization
  'lelylan.accessToken',
  'lelylan.requestWrapper',
  'lelylan.basicAuth',
  'lelylan.basicRequestWrapper',
  'lelylan.implicitFlow',

  // configuration
  'lelylan.config',

  // errors
  'lelylan.errors'
]);
