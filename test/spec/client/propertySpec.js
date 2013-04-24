'use strict';

describe('Property', function() {

  var resource      = { id: '1', uri: 'http://api.lelylan.com/properties/1' };
  var token         = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers       = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders   = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };
  var noAuthHeaders = { Accept: 'application/json, text/plain, */*' };
  var $httpBackend;
  var property;

  beforeEach(module('lelylan'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/properties/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Property) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/properties/1');
      Property.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Property) {
      var property = Property.get({ id: '1' });
      $httpBackend.flush();
      expect(property.uri).toEqual('http://api.lelylan.com/properties/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/properties?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Property) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/properties?name=Name');
      Property.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Property) {
      var properties = Property.query({ name: 'Name' });
      $httpBackend.flush();
      expect(properties[0].uri).toEqual('http://api.lelylan.com/properties/1');
    }));
  });


  describe('.public', function() {

    beforeEach(inject(function(AccessToken) { AccessToken.set({}); }));

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/properties/public', {}, noAuthHeaders).respond([resource]);
    });

    it('makes the request', inject(function(Property) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/properties/public');
      Property.public();
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Property) {
      var properties = Property.public();
      $httpBackend.flush();
      expect(properties[0].uri).toEqual('http://api.lelylan.com/properties/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/properties', { name: 'Name' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Property) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/properties');
      var property = new Property({ name: 'Name' });
      property.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Property) {
      var property = new Property({ name: 'Name' });
      property.$save();
      $httpBackend.flush();
      expect(property.uri).toEqual('http://api.lelylan.com/properties/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/properties/1', {}, headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/properties/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Property = $injector.get('Property');
      property = Property.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Property) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/properties/1');
      property.name = 'Updated Name';
      property.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Property) {
      property.name = 'Updated Name';
      property.$update();
      $httpBackend.flush();
      expect(property.uri).toEqual('http://api.lelylan.com/properties/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/properties/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/properties/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Property = $injector.get('Property');
      property = Property.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Property) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/properties/1');
      property.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Property) {
      property.$delete();
      $httpBackend.flush();
      expect(property.uri).toEqual('http://api.lelylan.com/properties/1');
    }));
  });
});
