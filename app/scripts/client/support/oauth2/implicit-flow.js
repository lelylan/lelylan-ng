'use strict';

var client = angular.module('lelylan.implicitFlow', ['ngResource']);

// TODO Here we must set the initial Implicit Flow data (init)
client.factory('ImplicitFlow', ['AccessToken', '$location', function(AccessToken, $location) {
  var implicitFlow = {};
  var params;

  // Define the authorization URL
  implicitFlow.url = function(newParams) {
    if (newParams) { params = newParams; }

    return params.site +
      params.authorizePath +
      '?response_type=token&' +
      'client_id=' + params.client + '&' +
      'redirect_uri=' + params.redirect + '&' +
      'scope=' + params.scope + '&' +
      'state=' + params.state + joiner + encode($location.url());
  }

  // Restore the exact URL existing before the authorization
  implicitFlow.restoreURL = function(scope) {
    var state = AccessToken.get().state.split(joiner);
    if (state[0]) AccessToken.set({ state: state[0] });
    if (state[1]) $location.url(decode(state[1]));
    scope.endpoint = implicitFlow.url(scope);
  }

  // Little hacking encoding (otherwise we are not able to restore the
  // URL before the implicit token request)
  var joiner = '5c6007a2', equal = 'e9e08740', sharp = '008e974e', amper = 'c1384ea1';
  var encode = function(value) { return value.replace(/=/g, equal).replace(/#/g, sharp).replace(/&/g, amper); }
  var decode = function(value) { return value.replace(/e9e08740/g, '=').replace(/008e974e/g, '#').replace(/c1384ea1/g, '&'); }

  return implicitFlow;
}]);
