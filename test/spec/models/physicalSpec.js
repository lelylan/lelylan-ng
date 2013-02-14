'use strict';

// TODO: must set the correct headers as right now the secret (or SHA-1 is not sent)
describe('Physical', function() {

  var $httpBackend, Physical, physical;
  var uri = 'http://mqtt.lelylan.com/devices/1';
  var params = {
    'properties':
      [ { 'uri': 'http://api.lelylan.com/properties/1',
          'id': 'status',
          'value': 'on' } ] };

  beforeEach(module('lelylan.services'));
  beforeEach(inject(function($injector) { $httpBackend = $injector.get('$httpBackend'); }));


  describe('#$update', function() {

    beforeEach(inject(function($resource) {
      Physical = $resource(uri, {}, { update: { method: 'PUT' } });
      physical = new Physical(params);
      $httpBackend.when('PUT', 'http://mqtt.lelylan.com/devices/1').respond(200);
    }));

    it('makes the request', function() {
      $httpBackend.expect('PUT', 'http://mqtt.lelylan.com/devices/1');
      physical.$update();
      $httpBackend.flush();
    });

    it('updates the resource', function() {
      physical.name = 'Updated Name';
      physical.$update();
      $httpBackend.flush();
      expect(physical.properties[0].value).toEqual('on');
    });
  });
});

