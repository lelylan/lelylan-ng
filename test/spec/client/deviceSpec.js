'use strict';

describe('Device', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/devices/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };
  var $httpBackend;
  var device;

  beforeEach(module('lelylan'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1');
      Device.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Device) {
      var device = Device.get({ id: '1' });
      $httpBackend.flush();
      expect(device.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });


  describe('.privates', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1/privates', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1/privates');
      Device.privates({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Device) {
      var device = Device.privates({ id: '1' });
      $httpBackend.flush();
      expect(device.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/devices?name=Name');
      Device.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Device) {
      var device = Device.query({ name: 'Name' });
      $httpBackend.flush();
      expect(device[0].uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/devices', { name: 'Name' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/devices');
      var device = new Device({ name: 'Name' });
      device.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Device) {
      var device = new Device({ name: 'Name' });
      device.$save();
      $httpBackend.flush();
      expect(device.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/devices/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Device = $injector.get('Device');
      device = Device.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/devices/1');
      device.name = 'Updated Name';
      device.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Device) {
      device.name = 'Updated Name';
      device.$update();
      $httpBackend.flush();
      expect(device.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/devices/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Device = $injector.get('Device');
      device = Device.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/devices/1');
      device.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Device) {
      device.$delete();
      $httpBackend.flush();
      expect(device.uri).toEqual('http://api.lelylan.com/devices/1');
    }));
  });


  describe('#$properties', function() {

    beforeEach(function() {
      resource.properties = [{ value: 'on' }];
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/devices/1/properties').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Device = $injector.get('Device');
      device = Device.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/devices/1/properties');
      device.properties = [{ uri: 'http://api.lelylan.com/properties/1', value: 'on' }]
      device.$properties();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Device) {
      device.properties = [{ uri: 'http://api.lelylan.com/properties/1', value: 'on' }]
      device.$properties();
      $httpBackend.flush();
      expect(device.properties[0].value).toEqual('on');
    }));
  });


  describe('#$execute', function() {

    beforeEach(function() {
      resource.properties = [{ value: 'on' }];
      $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/devices/1/functions').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Device = $injector.get('Device');
      device = Device.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Device) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/devices/1/functions');
      device.function = 'http://api.lelylan.com/functions/1'
      device.$execute();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Device) {
      device.function = 'http://api.lelylan.com/functions/1';
      device.$execute();
      $httpBackend.flush();
      expect(device.properties[0].value).toEqual('on');
    }));
  });
});
