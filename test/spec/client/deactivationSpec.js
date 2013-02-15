'use strict';

describe('Deactivation', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/devices/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var dataHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8'};
  var $httpBackend;
  var deactivation;

  beforeEach(module('lelylan'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('#$execute', function() {

    beforeEach(function() {
      $httpBackend.when('DELETE', 'http://api.lelylan.com/activations/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Deactivation) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/activations/1');
      var deactivation = new Deactivation({ activation_code: '1' });
      deactivation.$execute();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Deactivation) {
      var deactivation = new Deactivation({ activation_code: '1' });
      deactivation.$execute();
      $httpBackend.flush();
      expect(deactivation.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });
});
