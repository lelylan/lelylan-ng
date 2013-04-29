'use strict';

describe('Category', function() {

  var resource      = { name: 'lights' };
  var token         = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers       = { Accept: 'application/json, text/plain, */*', 'Authorization': 'Bearer token' };
  var $httpBackend;

  beforeEach(module('lelylan'));
  beforeEach(inject(function(AccessToken) { AccessToken.set(token); }));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('.query', function() {

    beforeEach(function() {
      $httpBackend.when('GET', 'http://api.lelylan.com/categories', {}).respond([resource]);
    });

    it('makes the request', inject(function(Category) {
      $httpBackend.expect('GET', 'http://api.lelylan.com/categories');
      Category.query();
      $httpBackend.flush();
    }));

    it('gets the resource', inject(function(Category) {
      var categories = Category.query();
      $httpBackend.flush();
      expect(categories[0].name).toEqual('lights');
    }));
  });
});
