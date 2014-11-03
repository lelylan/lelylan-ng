'use strict';


describe('Activation', function() {

  var $rootScope, $httpBackend, $sessionStorage, AccessToken, Activation, result, resource;

  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };


  beforeEach(module('lelylan.client'));

  beforeEach(inject(function($injector)   { Activation      = $injector.get('Activation') }));
  beforeEach(inject(function($injector)   { AccessToken     = $injector.get('AccessToken') }));
  beforeEach(inject(function($injector)   { $sessionStorage = $injector.get('$sessionStorage') }));
  beforeEach(inject(function($injector)   { $httpBackend    = $injector.get('$httpBackend'); }));
  beforeEach(inject(function($injector)   { $rootScope      = $injector.get('$rootScope'); }));


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/spec/fixtures';
  });

  beforeEach(function() {
    resource = JSON.parse(readFixtures('device.json'));
  });

  beforeEach(function() {
    $sessionStorage.token = token;
    AccessToken.set();
  });


  describe('.activate', function() {

    var payload = { activation_code: 'code' };

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/activations', payload, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('POST', 'http://api.lelylan.com/activations');
      Activation.activate(payload);
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Activation.activate(payload).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });



  describe('.deactivate', function() {

    beforeEach(function() {
      $httpBackend.when('DELETE', 'http://api.lelylan.com/activations/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/activations/1');
      Activation.deactivate('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Activation.deactivate('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });
});
