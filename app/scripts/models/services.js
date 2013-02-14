'use strict';


// -------------------
// Settings
// -------------------

angular.module('lelylan.config', []).value('lelylan.config', {
  endpoint: 'http://api.lelylan.com'
});


// -------------------
// REST Services
// -------------------

var resources = angular.module('lelylan.services', ['lelylan.config', 'ngResource'])


// --------------
// Profile
// --------------

resources.factory('Profile', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(config.endpoint + '/me');
  return RequestWrapper.wrap(resource, ['get']);
}]);


// --------------
// Device
// --------------

resources.factory('Device', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/devices/:id/:action',
    { id: '@id' },
    { privates:   { method: 'GET', params: { action: 'privates' } },
      update:     { method: 'PUT' },
      properties: { method: 'PUT', params: { action: 'properties' } },
      execute:    { method: 'PUT', params: { action: 'functions' } }
    });

  return RequestWrapper.wrap(resource, ['get', 'privates', 'query', 'save', 'update', 'delete', 'properties', 'execute']);
}]);


// --------------
// History
// --------------

resources.factory('History', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(config.endpoint + '/histories/:id', { id: '@id' });
  return RequestWrapper.wrap(resource, ['get', 'query']);
}]);


// --------------
// Activation
// --------------

resources.factory('Activation', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(config.endpoint + '/activations', { }, { execute: { method: 'POST' } });
  return RequestWrapper.wrap(resource, ['execute']);
}]);


// --------------
// Deactivation
// --------------
// TODO Activation and deactivation must be in the same class the only problem is that we should make a personalized http call

resources.factory('Deactivation', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/activations/:activationCode',
    { activationCode: '@activation_code'},
    { execute: { method: 'DELETE' } }
  );

  return RequestWrapper.wrap(resource, ['execute']);
}]);


// --------------
// Type
// --------------

resources.factory('Type', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/types/:id',
    { id: '@id' },
    { update: { method: 'PUT' },
      public: { method: 'GET', params: { id: 'public' }, isArray: true } }
  );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);


// --------------
// Property
// --------------

resources.factory('Property', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/properties/:id',
    { id: '@id' },
    { update: { method: 'PUT' },
      public: { method: 'GET', params: { id: 'public' }, isArray: true } }
  );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);


// --------------
// Function
// --------------

resources.factory('Function', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/functions/:id',
    { id: '@id' },
    { update: { method: 'PUT' },
      public: { method: 'GET', params: { id: 'public' }, isArray: true } }
  );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);


// --------------
// Status
// --------------

resources.factory('Status', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/statuses/:id',
    { id: '@id' },
    { update: { method: 'PUT' },
      public: { method: 'GET', params: { id: 'public' }, isArray: true } }
  );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);


// --------------
// Location
// --------------

resources.factory('Location', ['RequestWrapper', '$resource', '$http', 'lelylan.config', function(RequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/locations/:id',
    { id: '@id' },
    { update: { method: 'PUT' } }
  );

  return RequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);


// --------------
// Subscription
// --------------

resources.factory('Subscription', ['BasicRequestWrapper', '$resource', '$http', 'lelylan.config', function(BasicRequestWrapper, $resource, $http, config) {

  var resource = $resource(
    config.endpoint + '/subscriptions/:id',
    { id: '@id' },
    { update: { method: 'PUT' } }
  );

  return BasicRequestWrapper.wrap(resource, ['get', 'query', 'save', 'update', 'delete']);
}]);


// -----------------------------
// Request Wrapper (for OAuth2)
// ------------------------------

resources.factory('RequestWrapper', ['AccessToken', 'ImplicitFlow', '$http', '$q', function(AccessToken, ImplicitFlow, $http, $q) {
  var requestWrapper = {};
  var token;

  requestWrapper.wrap = function(resource, actions, options) {
    token = AccessToken.initialize();
    var wrappedResource = resource;
    for (var i=0; i < actions.length; i++) { request(wrappedResource, actions[i]); };
    return wrappedResource;
  };

  var request = function(resource, action) {
    resource['_' + action] = resource[action];

    resource[action] = function(params, data, success, error) {
      (AccessToken.get().access_token) ? setAuthorizationHeader() : deleteAuthorizationHeader();
      if (token.expires_at && token.expires_at < new Date()) window.location.replace(ImplicitFlow.url());
      return resource['_' + action].call(this, params, data, success, error);
    };
  };

  var setAuthorizationHeader = function() {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
  };

  var deleteAuthorizationHeader = function() {
    delete $http.defaults.headers.common['Authorization']
  };

  return requestWrapper;
}]);


// -----------------
// Access Token
// -----------------

resources.factory('AccessToken', ['$location', '$http', function($location, $http) {
  var accessToken = {};
  var token = {};

  // Returns the access token
  accessToken.get = function() {
    return token
  }

  // Set the access token from the fragment URI
  accessToken.initialize = function() {
    var hash = accessToken.parseToken();
    if (hash.access_token) accessToken.set(hash);
    if (hash.error) accessToken.set(hash);
    return token
  };

  // Set the access token
  accessToken.set = function(params) {
    angular.extend(token, params);
    setExpiresAt();
    // TODO put this line into the request wrapper
    return token;
  };

  // Remove the access token authorization header
  accessToken.delete = function() {
    token = {};
  }

  // Get the access token from the fragment URI
  accessToken.parseToken = function() {
    var result = {};
    var splitted = $location.hash().split('&');
    for (var i = 0; i < splitted.length; i++) {
      var param = splitted[i].split('=');
      var key = param[0]; var value = param[1];
      result[key] = value };

    return result;
  };

  // Set the access token expiration date (useful for refresh logics)
  var setExpiresAt = function() {
    var expires_at = new Date();
    expires_at.setSeconds(expires_at.getSeconds() + parseInt(token.expires_in) - 60); // 60 seconds less to secure browser and response latency
    token.expires_at = expires_at;
  };

  return accessToken;
}]);


// -----------------
// Implicit Flow
// -----------------

// TODO Here we must set the initial Implicit Flow data (init)
resources.factory('ImplicitFlow', ['AccessToken', '$location', function(AccessToken, $location) {
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


// ----------------------------------
// Request Wrapper (for Basic Auth)
// ----------------------------------

resources.factory('BasicRequestWrapper', ['BasicAuth', 'Base64', '$http', function(BasicAuth, Base64, $http) {
  var requestWrapper = {};

  requestWrapper.wrap = function(resource, actions, options) {
    var wrappedResource = resource;
    for (var i=0; i < actions.length; i++) { request(wrappedResource, actions[i]); };
    return wrappedResource;
  };

  var request = function(resource, action) {
    resource['_' + action] = resource[action];

    resource[action] = function(params, data, success, error) {
      (BasicAuth.get().id && BasicAuth.get().secret) ? setAuthorizationHeader() : deleteAuthorizationHeader();
      return resource['_' + action].call(this, params, data, success, error);
    };
  };

  var setAuthorizationHeader = function() {
    var basic = BasicAuth.get();
    $http.defaults.headers.common['Authorization'] = Base64.encode(basic.id + ':' + basic.secret);
  };

  var deleteAuthorizationHeader = function() {
    delete $http.defaults.headers.common['Authorization']
  };

  return requestWrapper;
}]);


// -----------------------
// Basic authentincation
// -----------------------

resources.factory('BasicAuth', [function() {
  var basicAuth = {};
  var auth = {};

  basicAuth.get = function() { return auth };
  basicAuth.set = function(params) { angular.extend(auth, params) };

  return basicAuth;
}]);

resources.factory('Base64', [function() {
  var base64 = {};
  var cb64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  base64.encode = function(str) {
    var tmpvar,i,str,j;
    var resultstr;
    i=str.length;
    j=0;
    resultstr="";
    while(i>0){
      if (i>2){
        tmpvar=str.substr(j,3)
        resultstr = resultstr + encodeBlock(tmpvar,3);
      }else{
        tmpvar=str.substr(j,i)
        resultstr = resultstr + encodeBlock(tmpvar,i);
      }
      i-=3;
      j+=3;
    }
    return resultstr;
  };

  var encodeBlock = function(instr, len) {
    var out=new Array(4);
    var in0,in1,in2,in3;
    in0=instr.charCodeAt(0);
    out[0]=cb64.charAt(in0 >> 2);
    if (len < 2){
      in1=0;
      in2=0;
      in3=0;
    }else{
      in1=instr.charCodeAt(1);
      if (len<3){
        in2=0;
        in3=0;
      }else{
        in2=instr.charCodeAt(2);
        in3=instr.charCodeAt(3);
      }
    }
    out[1]=cb64.charAt( ((in0 & 0x03) << 4)| ((in1 & 0xf0) >> 4));
    if (len>1){
      out[2] = cb64.charAt( ((in1 & 0x0f) << 2) | ((in2 & 0xc0) >> 6) );
    }else{
      out[2] = '=';
    }
    if (len>2){
      out[3] = cb64.charAt(in2 & 0x3f);
    }else{
      out[3] = '=';
    }
    return(out[0] + out[1] + out[2] + out[3]);
  }

  return base64;
}]);

