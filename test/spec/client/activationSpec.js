'use strict';

describe('Activation', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/devices/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', 'Authorization': 'Bearer token'};
  var dataHeaders = { Accept: 'application/json, text/plain, */*', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8'};
  var $httpBackend;
  var activation;

  beforeEach(module('lelylan'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('#$execute', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/activations', { activation_code: '1' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Activation) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/activations');
      var activation = new Activation({ activation_code: '1' });
      activation.$execute();
      $httpBackend.flush();
    }));

    // TODO Understand why it does not get back the resource and I can't check the URI
    it('creates the resource', inject(function(Activation) {
      var activation = new Activation({ activation_code: '1' });
      activation.$execute();
      $httpBackend.flush();
      expect(activation.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });
});
