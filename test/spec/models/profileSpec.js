'use strict';

describe('Profile', function() {

  var resource = { id: '1', name: 'Alice' };
  var token    = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers  = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token'};
  var $httpBackend;

  beforeEach(module('lelylan.resources'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.whenGET('http://api.lelylan.com/me', headers).respond(resource);
    });

    it('makes the request', inject(function(Profile) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/me');
      Profile.get();
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Profile) {
      var profile = Profile.get();
      $httpBackend.flush();
      expect(profile.name).toEqual('Alice');
    }));
  });
});
