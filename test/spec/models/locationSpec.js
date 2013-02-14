'use strict';

describe('Location', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/locations/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var dataHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8'};
  var $httpBackend;
  var location;

  beforeEach(module('lelylan.resources'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/locations/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Location) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/locations/1');
      Location.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Location) {
      var location = Location.get({ id: '1' });
      $httpBackend.flush();
      expect(location.uri).toEqual('http://api.lelylan.com/locations/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/locations?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Location) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/locations?name=Name');
      Location.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Location) {
      var location = Location.query({ name: 'Name' });
      $httpBackend.flush();
      expect(location[0].uri).toEqual('http://api.lelylan.com/locations/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/locations', { name: 'Name' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Location) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/locations');
      var location = new Location({ name: 'Name' });
      location.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Location) {
      var location = new Location({ name: 'Name' });
      location.$save();
      $httpBackend.flush();
      expect(location.uri).toEqual('http://api.lelylan.com/locations/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/locations/1', {}, headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/locations/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Location = $injector.get('Location');
      location = Location.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Location) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/locations/1');
      location.name = 'Updated Name';
      location.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Location) {
      location.name = 'Updated Name';
      location.$update();
      $httpBackend.flush();
      expect(location.uri).toEqual('http://api.lelylan.com/locations/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/locations/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/locations/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Location = $injector.get('Location');
      location = Location.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Location) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/locations/1');
      location.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Location) {
      location.$delete();
      $httpBackend.flush();
      expect(location.uri).toEqual('http://api.lelylan.com/locations/1');
    }));
  });
});
