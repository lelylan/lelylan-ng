'use strict';


describe('Device', function() {

  var $rootScope, $httpBackend, AccessToken, Device, result, resource;

  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var new_token   = { access_token: 'new_token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var new_headers = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer new_token' };
  var not_headers = { Accept: 'application/json, text/plain, */*' };


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

  describe('when logged in', function() {

    beforeEach(function() {
      $rootScope.$broadcast('oauth2:login', token);
    });


    describe('sets the access token', function() {

      beforeEach(function() {
        $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', {}, headers)
        .respond(resource);
      });

      it('makes the request', function() {
        $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1');
        Device.find('1');
        $httpBackend.flush();
      });
    });

    describe('when gets new token', function() {

      beforeEach(function() {
        $rootScope.$broadcast('oauth2:login', new_token);
      });


      describe('sets the new access token', function() {

        beforeEach(function() {
          $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', {}, new_headers).respond(resource);
        });

        it('makes the request', function() {
          $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1');
          Device.find('1');
          $httpBackend.flush();
        });
      });
    });
  });


  describe('when logged out', function() {

    describe('does not set the access token', function() {

      beforeEach(function() {
        $httpBackend.when('GET', 'http://api.lelylan.com/devices/1', {}, not_headers).respond(401);
      });

      it('makes the request', function() {
        $httpBackend.expect('GET', 'http://api.lelylan.com/devices/1');
        Device.find('1');
        $httpBackend.flush();
      });
    });
  });
});
