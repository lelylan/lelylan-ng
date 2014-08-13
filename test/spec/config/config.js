'use strict';

describe('lelylanClientConfig', function() {

  var $rootScope, $httpBackend, AccessToken, Device, result, resource, lelylanClientConfig, fake;


  describe('#endpoint', function() {

    describe('with default configuration', function() {

      beforeEach(module('lelylan.client'));
      beforeEach(inject(function($injector) { Device = $injector.get('Device') }));
      beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));

      beforeEach(function() {
        $httpBackend.when('GET', 'http://api.lelylan.com/devices')
          .respond([resource]);
      });

      it('makes the request', function() {
        $httpBackend.expect('GET', 'http://api.lelylan.com/devices');
        Device.all();
        $httpBackend.flush();
      });
    });


    describe('with custom configuration', function() {

      beforeEach(function () {
        fake = angular.module('test.config', function () {});
      });

      beforeEach(function () {
        fake.config(function(lelylanClientConfigProvider) {
          lelylanClientConfigProvider.configure({ endpoint: 'http://localhost:8000' });
        });
      });

      beforeEach(function () {
        module('lelylan.client', 'test.config');
      });

      beforeEach(inject(function($injector) { Device = $injector.get('Device') }));
      beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));

      beforeEach(function() {
        $httpBackend.when('GET', 'http://localhost:8000/devices')
          .respond([resource]);
      });

      it('makes the request', function() {
        $httpBackend.expect('GET', 'http://localhost:8000/devices');
        Device.all();
        $httpBackend.flush();
      });
    });
  });
});

