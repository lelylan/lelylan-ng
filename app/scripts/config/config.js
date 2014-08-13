'use strict';

angular.module('lelylan.client').provider('lelylanClientConfig', function() {
  var config;

  config = { endpoint: 'http://api.lelylan.com' };

  return {

    configure: function(params) {
      return angular.extend(config, params);
    },

    $get: function() {
      return config;
    }
  }
});
