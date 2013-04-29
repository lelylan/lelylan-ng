'use strict';

describe('Type', function() {

  var resource      = { id: '1', uri: 'http://api.lelylan.com/types/1' };
  var token         = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers       = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders   = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };
  var noAuthHeaders = { Accept: 'application/json, text/plain, */*' };
  var $httpBackend;
  var type;

  beforeEach(module('lelylan'));
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
      var types = Type.query({ name: 'Name' });
      $httpBackend.flush();
      expect(types[0].uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });


  describe('.public', function() {

    beforeEach(inject(function(AccessToken) { AccessToken.set({}); }));

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/public', {}, noAuthHeaders).respond([resource]);
    });

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types/public');
      Type.public();
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Type) {
      var types = Type.public();
      $httpBackend.flush();
      expect(types[0].uri).toEqual('http://api.lelylan.com/types/1');
    }));
  });


  describe('.popular', function() {

    beforeEach(inject(function(AccessToken) { AccessToken.set({}); }));

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/popular', {}, noAuthHeaders).respond([resource]);
    });

    it('makes the request', inject(function(Type) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types/popular');
      Type.popular();
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Type) {
      var types = Type.popular();
      $httpBackend.flush();
      expect(types[0].uri).toEqual('http://api.lelylan.com/types/1');
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

