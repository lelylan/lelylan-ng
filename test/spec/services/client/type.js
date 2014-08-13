'use strict';


describe('Type', function() {

  var $rootScope, $httpBackend, AccessToken, Type, result, resource;

  var token       = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };


  beforeEach(module('lelylan.client'));

  beforeEach(inject(function($injector)   { Type         = $injector.get('Type') }));
  beforeEach(inject(function($injector)   { AccessToken  = $injector.get('AccessToken') }));
  beforeEach(inject(function($injector)   { $httpBackend = $injector.get('$httpBackend'); }));
  beforeEach(inject(function($injector)   { $rootScope   = $injector.get('$rootScope'); }));


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/spec/fixtures'
  });

  beforeEach(function() {
    resource = JSON.parse(readFixtures('type.json'));
  });

  beforeEach(function() {
    AccessToken.setToken(token);
  });



  describe('.find', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types/1');
      Type.find('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.find('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/types/1');
    });
  });


  describe('.all', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types?name=alice', {}, headers)
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types?name=alice');
      Type.all({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.all({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/types/1');
    });
  });


  describe('.public', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/public?name=alice', {})
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types/public?name=alice');
      Type.public({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.public({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/types/1');
    });
  });


  describe('.popular', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/types/popular?name=alice', {})
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/types/popular?name=alice');
      Type.popular({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.popular({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/types/1');
    });
  });


  describe('.create', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/types', { name: 'alice' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('POST', 'http://api.lelylan.com/types');
      Type.create({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.create({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/types/1');
    });
  });


  describe('.update', function() {

    beforeEach(function() {
      $httpBackend.when('PUT', 'http://api.lelylan.com/types/1', { name: 'update' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/types/1');
      Type.update('1', { name: 'update' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.update('1', { name: 'update' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/types/1');
    });
  });


  describe('.delete', function() {

    beforeEach(function() {
      $httpBackend.when('DELETE', 'http://api.lelylan.com/types/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/types/1');
      Type.delete('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Type.delete('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/types/1');
    });
  });
});
