'use strict';

describe('Type', function() {

  var resource      = { name: 'lights' };
  var token         = { access_token: 'token', token_type: 'bearer', expires_in: '7200', state: 'state'};
  var headers       = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token' };
  var dataHeaders   = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer token', 'Content-Type': 'application/json;charset=utf-8' };
  var noAuthHeaders = { 'X-XSRF-TOKEN': undefined, 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest' };
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
