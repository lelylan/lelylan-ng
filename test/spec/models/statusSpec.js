'use strict';

describe('Status', function() {

  var resource = { id: '1', uri: 'http://api.lelylan.com/statuses/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers  = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var dataHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8'};
  var $httpBackend;
  var status;

  beforeEach(module('lelylan.services'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/statuses/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Status) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/statuses/1');
      Status.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Status) {
      var status = Status.get({ id: '1' });
      $httpBackend.flush();
      expect(status.uri).toEqual('http://api.lelylan.com/statuses/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/statuses?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Status) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/statuses?name=Name');
      Status.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Status) {
      var status = Status.query({ name: 'Name' });
      $httpBackend.flush();
      expect(status[0].uri).toEqual('http://api.lelylan.com/statuses/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/statuses', { name: 'Name' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Status) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/statuses');
      var status = new Status({ name: 'Name' });
      status.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Status) {
      var status = new Status({ name: 'Name' });
      status.$save();
      $httpBackend.flush();
      expect(status.uri).toEqual('http://api.lelylan.com/statuses/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/statuses/1', {}, headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/statuses/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Status = $injector.get('Status');
      status = Status.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Status) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/statuses/1');
      status.name = 'Updated Name';
      status.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Status) {
      status.name = 'Updated Name';
      status.$update();
      $httpBackend.flush();
      expect(status.uri).toEqual('http://api.lelylan.com/statuses/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/statuses/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/statuses/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Status = $injector.get('Status');
      status = Status.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Status) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/statuses/1');
      status.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Status) {
      status.$delete();
      $httpBackend.flush();
      expect(status.uri).toEqual('http://api.lelylan.com/statuses/1');
    }));
  });
});
