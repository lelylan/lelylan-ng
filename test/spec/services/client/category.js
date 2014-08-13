'use strict';


describe('Category', function() {

  var $rootScope, $httpBackend, AccessToken, Category, result, resource;

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

  describe('.all', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/categories', {})
        .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/categories');
      Category.all();
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Category.all().success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/devices/1');
    });
  });
});
