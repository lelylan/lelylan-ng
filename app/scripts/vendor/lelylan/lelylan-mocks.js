'use strict';

var device = {
  id: '1',
  uri: 'http://api.lelylan.com/devices/1',
  name: 'Light',
  updated_at: '2012-12-20T18:40:19Z'
};

var profile = {
  email: 'alice@wonderland.com',
  name: 'Alice'
};

var headers = {
  'X-XSRF-TOKEN': undefined,
  'Accept': 'application/json, text/plain, */*',
  'X-Requested-With': 'XMLHttpRequest',
  'Authorization': 'Bearer token'
};

var notAuthHeaders = {
  'X-XSRF-TOKEN': undefined,
  'Accept': 'application/json, text/plain, */*',
  'X-Requested-With': 'XMLHttpRequest'
};


var test = angular.module('test', ['lelylan', 'ngMockE2E']);

test.run(function($httpBackend) {
  $httpBackend.whenGET('http://api.lelylan.com/me').respond(profile);
  $httpBackend.whenGET('http://api.lelylan.com/devices/1', headers).respond(device);
  $httpBackend.whenGET('http://api.lelylan.com/devices/1', notAuthHeaders).respond('401');
  $httpBackend.whenGET('http://api.lelylan.com/devices/2').respond(401);

  $httpBackend.when('GET', /\/templates\//).passThrough();
});
