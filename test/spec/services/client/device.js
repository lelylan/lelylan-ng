'use strict';


describe('Device', function() {

  var $rootScope, $httpBackend, AccessToken, Device, result, resource;

  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };


  beforeEach(module('lelylan.client'));

  beforeEach(inject(function($injector)   { Device       = $injector.get('Device') }));
  beforeEach(inject(function($injector)   { AccessToken  = $injector.get('AccessToken') }));
  beforeEach(inject(function($injector)   { $httpBackend = $injector.get('$httpBackend'); }));
  beforeEach(inject(function($injector)   { $rootScope   = $injector.get('$rootScope'); }));


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/spec/fixtures'
  });

  beforeEach(function() {
    resource = JSON.parse(readFixtures('device.json'));
  });

  beforeEach(function() {
    $rootScope.$broadcast('oauth2:login', token);
  });



  describe('.find', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1');
      Device.find('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.find('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices?name=alice', {}, headers)
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/devices?name=alice');
      Device.query({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.query({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });


  describe('.privates', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1/privates', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1/privates');
      Device.privates('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.privates('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });


  describe('.create', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/devices', { name: 'alice' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('POST', 'http://api.lelylan.com/devices');
      Device.create({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.create({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });


  describe('.update', function() {

    beforeEach(function() {
      $httpBackend.when('PUT', 'http://api.lelylan.com/devices/1', { name: 'update' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/devices/1');
      Device.update('1', { name: 'update' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.update('1', { name: 'update' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });


  describe('.delete', function() {

    beforeEach(function() {
      $httpBackend.when('DELETE', 'http://api.lelylan.com/devices/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/devices/1');
      Device.delete('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.delete('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });


  describe('.properties', function() {

    var payload = { properties: [{ id: '1', value: 'on'}] };

    beforeEach(function() {
      $httpBackend.when('PUT', 'http://api.lelylan.com/devices/1/properties', payload, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/devices/1/properties');
      Device.properties('1', payload);
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Device.properties('1', payload).success(function(response) { result = response });

      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });
});
