'use strict';

describe('Function', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/functions/1' };
  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var dataHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8'};
  var noAuthHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest' };
  var $httpBackend;
  var _function;

  beforeEach(module('lelylan.resources'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Function) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/functions/1');
      Function.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Function) {
      var _function = Function.get({ id: '1' });
      $httpBackend.flush();
      expect(_function.uri).toEqual('http://api.lelylan.com/functions/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Function) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/functions?name=Name');
      Function.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Function) {
      var _function = Function.query({ name: 'Name' });
      $httpBackend.flush();
      expect(_function[0].uri).toEqual('http://api.lelylan.com/functions/1');
    }));
  });


  describe('.public', function() {

    beforeEach(inject(function(AccessToken) { AccessToken.set({}); }));

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions/public', {}, noAuthHeaders).respond([resource]);
    });

    it('makes the request', inject(function(Function) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/functions/public');
      Function.public();
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Function) {
      var functions = Function.public();
      $httpBackend.flush();
      expect(functions[0].uri).toEqual('http://api.lelylan.com/functions/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/functions', { name: 'Name' }, dataHeaders).respond(resource);
    });

    it('makes the request', inject(function(Function) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/functions');
      var _function = new Function({ name: 'Name' });
      _function.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Function) {
      var _function = new Function({ name: 'Name' });
      _function.$save();
      $httpBackend.flush();
      expect(_function.uri).toEqual('http://api.lelylan.com/functions/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/functions/1', {}, headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/functions/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Function = $injector.get('Function');
      _function = Function.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Function) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/functions/1');
      _function.name = 'Updated Name';
      _function.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Function) {
      _function.name = 'Updated Name';
      _function.$update();
      $httpBackend.flush();
      expect(_function.uri).toEqual('http://api.lelylan.com/functions/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/functions/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Function = $injector.get('Function');
      _function = Function.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Function) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/functions/1');
      _function.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Function) {
      _function.$delete();
      $httpBackend.flush();
      expect(_function.uri).toEqual('http://api.lelylan.com/functions/1');
    }));
  });
});
