'use strict';

describe('Subscription', function() {

  var resource    = { id: '1', uri: 'http://api.lelylan.com/subscriptions/1' };
  var client      = { clientID: 'id', clientSecret: 'secret' };
  var headers     = { Accept: 'application/json, text/plain, */*', 'Authorization': 'aWQ6c2VjcmV0'};
  var dataHeaders = { Accept: 'application/json, text/plain, */*', 'Authorization': 'aWQ6c2VjcmV0', 'Content-Type': 'application/json;charset=utf-8'};
  var $httpBackend;
  var subscription;

  beforeEach(module('lelylan'));
  beforeEach(inject(function(BasicAuth) { BasicAuth.set(client); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.get', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/subscriptions/1', {}, headers).respond(resource);
    });

    it('makes the request', inject(function(Subscription) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/subscriptions/1');
      Subscription.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Subscription) {
      var subscription = Subscription.get({ id: '1' });
      $httpBackend.flush();
      expect(subscription.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    }));
  });


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/subscriptions?name=Name', {}, headers).respond([resource]);
    });

    it('makes the request', inject(function(Subscription) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/subscriptions?name=Name');
      Subscription.query({ name: 'Name' });
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Subscription) {
      var subscription = Subscription.query({ name: 'Name' });
      $httpBackend.flush();
      expect(subscription[0].uri).toEqual('http://api.lelylan.com/subscriptions/1');
    }));
  });


  describe('#$save', function() {

    beforeEach(function() {
      $httpBackend.when('POST', 'http://api.lelylan.com/subscriptions', { name: 'Name' })
      .respond(function(method, url, data, headers){
        return [200, resource, {}];
      });

      //.respond(resource);
    });

    it('makes the request', inject(function(Subscription) {
      $httpBackend.expect('POST', 'http://api.lelylan.com/subscriptions');
      var subscription = new Subscription({ name: 'Name' });
      subscription.$save();
      $httpBackend.flush();
    }));

    it('creates the resource', inject(function(Subscription) {
      var subscription = new Subscription({ name: 'Name' });
      subscription.$save();
      $httpBackend.flush();
      expect(subscription.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    }));
  });


  describe('#$update', function() {

    beforeEach(function() {
      resource.name = "Updated Name";
      $httpBackend.when('GET', 'http://api.lelylan.com/subscriptions/1', {}, headers).respond(resource);
      $httpBackend.when('PUT', 'http://api.lelylan.com/subscriptions/1').respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Subscription = $injector.get('Subscription');
      subscription = Subscription.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Subscription) {
      $httpBackend.expect('PUT', 'http://api.lelylan.com/subscriptions/1');
      subscription.name = 'Updated Name';
      subscription.$update();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Subscription) {
      subscription.name = 'Updated Name';
      subscription.$update();
      $httpBackend.flush();
      expect(subscription.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    }));
  });


  describe('#$delete', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/subscriptions/1', {}, headers).respond(resource);
      $httpBackend.when('DELETE', 'http://api.lelylan.com/subscriptions/1', {}, headers).respond(resource);
    });

    beforeEach(inject(function($injector) {
      var Subscription = $injector.get('Subscription');
      subscription = Subscription.get({ id: '1' });
      $httpBackend.flush();
    }));

    it('makes the request', inject(function(Subscription) {
      $httpBackend.expect('DELETE', 'http://api.lelylan.com/subscriptions/1');
      subscription.$delete();
      $httpBackend.flush();
    }));

    it('updates the resource', inject(function(Subscription) {
      subscription.$delete();
      $httpBackend.flush();
      expect(subscription.uri).toEqual('http://api.lelylan.com/subscriptions/1');
    }));
  });
});
