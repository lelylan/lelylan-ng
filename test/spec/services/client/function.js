'use strict';


describe('Function', function() {

  var $rootScope, $httpBackend, AccessToken, Function, result, resource;

  var token       = { access_token: 'token', token_function: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };


  beforeEach(module('lelylan.client'));

  beforeEach(inject(function($injector)   { Function     = $injector.get('Function') }));
  beforeEach(inject(function($injector)   { AccessToken  = $injector.get('AccessToken') }));
  beforeEach(inject(function($injector)   { $httpBackend = $injector.get('$httpBackend'); }));
  beforeEach(inject(function($injector)   { $rootScope   = $injector.get('$rootScope'); }));


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/spec/fixtures'
  });

  beforeEach(function() {
    resource = JSON.parse(readFixtures('function.json'));
  });

  beforeEach(function() {
    $rootScope.$broadcast('oauth2:login', token);
  });



  describe('.find', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/functions/1');
      Function.find('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Function.find('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/functions/1');
    });
  });


  describe('.all', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions?name=alice', {}, headers)
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/functions?name=alice');
      Function.all({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Function.all({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/functions/1');
    });
  });


  describe('.public', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/functions/public?name=alice', {}, headers)
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/functions/public?name=alice');
      Function.public({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Function.public({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/functions/1');
    });
  });


  describe('.create', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/functions', { name: 'alice' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('POST', 'http://api.lelylan.com/functions');
      Function.create({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Function.create({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/functions/1');
    });
  });


  describe('.update', function() {

    beforeEach(function() {
      $httpBackend.when('PUT', 'http://api.lelylan.com/functions/1', { name: 'update' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/functions/1');
      Function.update('1', { name: 'update' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Function.update('1', { name: 'update' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/functions/1');
    });
  });


  describe('.delete', function() {

    beforeEach(function() {
      $httpBackend.when('DELETE', 'http://api.lelylan.com/functions/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/functions/1');
      Function.delete('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Function.delete('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/functions/1');
    });
  });
});
