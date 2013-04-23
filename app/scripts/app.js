'use strict';

angular.module('lelylan', [

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
  'lelylan.category',

  // authorization
  'lelylan.loggedUser',
  'lelylan.accessToken',
  'lelylan.requestWrapper',
  'lelylan.basicAuth',
  'lelylan.basicRequestWrapper',
  'lelylan.implicitFlow',

  // configuration
  'lelylan.config',

  // requests flow
  'lelylan.requests',
  'lelylan.errors',

  // oauth components
  'lelylan.login'
]);
