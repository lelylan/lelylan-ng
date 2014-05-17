'use strict';


describe('Subscription', function() {

  var $rootScope, $httpBackend, AccessToken, Subscription, result, resource;

  var credentials = { clientId: 'id', clientSecret: 'secret' };
  var token       = { access_token: 'token', token_subscription: 'bearer', expires_in: '7200', state: 'state'};
  var headers     = { Accept: 'application/json, text/plain, */*', Authorization: 'Basic aWQ6c2VjcmV0' };
  var dataHeaders = { Accept: 'application/json, text/plain, */*', Authorization: 'Basic aWQ6c2VjcmV0', 'Content-Type': 'application/json;charset=utf-8' };


  beforeEach(module('lelylan.client'));

  beforeEach(inject(function($injector)   { Subscription     = $injector.get('Subscription') }));
  beforeEach(inject(function($injector)   { AccessToken  = $injector.get('AccessToken') }));
  beforeEach(inject(function($injector)   { $httpBackend = $injector.get('$httpBackend'); }));
  beforeEach(inject(function($injector)   { $rootScope   = $injector.get('$rootScope'); }));


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/spec/fixtures'
  });

  beforeEach(function() {
    resource = JSON.parse(readFixtures('subscription.json'));
  });

  beforeEach(function() {
    $rootScope.$broadcast('oauth2:login', token);
  });

  beforeEach(function() {
    Subscription.auth(credentials);
  });



  describe('.find', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/subscriptions/1', {}, headers).respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/subscriptions/1');
      Subscription.find('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Subscription.find('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    });
  });


  describe('.all', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/subscriptions?name=alice', {}, headers)
      .respond([resource]);
    });

    it('makes the request', function() {
      $httpBackend.expect('GET', 'http://api.lelylan.com/subscriptions?name=alice');
      Subscription.all({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Subscription.all({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result[0].uri).toEqual('http://api.lelylan.com/subscriptions/1');
    });
  });


  describe('.create', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/subscriptions', { name: 'alice' }, dataHeaders).respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('POST', 'http://api.lelylan.com/subscriptions');
      Subscription.create({ name: 'alice' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Subscription.create({ name: 'alice' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    });
  });


  describe('.update', function() {

    beforeEach(function() {
      $httpBackend.when('PUT', 'http://api.lelylan.com/subscriptions/1', { name: 'update' }, dataHeaders)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/subscriptions/1');
      Subscription.update('1', { name: 'update' });
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Subscription.update('1', { name: 'update' }).success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    });
  });


  describe('.delete', function() {

    beforeEach(function() {
      $httpBackend.when('DELETE', 'http://api.lelylan.com/subscriptions/1', {}, headers)
      .respond(resource);
    });

    it('makes the request', function() {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/subscriptions/1');
      Subscription.delete('1');
      $httpBackend.flush();
    });

    it('gets the resource', function() {
      Subscription.delete('1').success(function(response) { result = response })
      $httpBackend.flush();
      expect(result.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    });
  });
});
