'use strict';

describe('History', function() {

  var resource = { id: '1', uri: 'http://api.lelylan.com/histories/1' };
  var token    = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers  = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var $httpBackend;
  var history;

  beforeEach(module('lelylan.resources'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/histories/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(History) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/histories/1');
      History.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(History) {
      var history = History.get({ id: '1' });
      $httpBackend.flush();
      expect(history.uri).toEqual('http://api.lelylan.com/histories/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/histories?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(History) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/histories?name=Name');
      History.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(History) {
      var history = History.query({ name: 'Name' });
      $httpBackend.flush();
      expect(history[0].uri).toEqual('http://api.lelylan.com/histories/1');
    }));
  });
});
