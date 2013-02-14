'use strict';

describe('Type', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/types/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var dataHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8'};
  var $httpBackend;
  var type;

  beforeEach(module('lelylan.services'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types/1');
      Type.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Type) {
      var type = Type.get({ id: '1' });
      $httpBackend.flush();
      expect(type.uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types?name=Name');
      Type.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Type) {
      var type = Type.query({ name: 'Name' });
      $httpBackend.flush();
      expect(type[0].uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/types', { name: 'Name' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/types');
      var type = new Type({ name: 'Name' });
      type.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Type) {
      var type = new Type({ name: 'Name' });
      type.$save();
      $httpBackend.flush();
      expect(type.uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/types/1', {}, headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/types/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Type = $injector.get('Type');
      type = Type.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/types/1');
      type.name = 'Updated Name';
      type.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Type) {
      type.name = 'Updated Name';
      type.$update();
      $httpBackend.flush();
      expect(type.uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/types/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Type = $injector.get('Type');
      type = Type.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/types/1');
      type.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Type) {
      type.$delete();
      $httpBackend.flush();
      expect(type.uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });
});

