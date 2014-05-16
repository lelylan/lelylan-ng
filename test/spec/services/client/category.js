'use strict';


describe('Category', function() {

  var $rootScope, $httpBackend, AccessToken, Category, result, resource;

  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };


  beforeEach(module('lelylan.client'));

  beforeEach(inject(function($injector)   { Category       = $injector.get('Category') }));
  beforeEach(inject(function($injector)   { AccessToken  = $injector.get('AccessToken') }));
  beforeEach(inject(function($injector)   { $httpBackend = $injector.get('$httpBackend'); }));
  beforeEach(inject(function($injector)   { $rootScope   = $injector.get('$rootScope'); }));


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/spec/fixtures'
  });

  beforeEach(function() {
    resource = JSON.parse(readFixtures('device.json'));
  });

  beforeEach(function() {
    $rootScope.$broadcast('oauth2:login', token);
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/categories', {}, headers)
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/categories');
      Category.query({});
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Category.query({}).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });
});
