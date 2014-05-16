'use strict';


/* Sets and clears the access token used during the API requests */

angular.module('lelylan.client').run(function($rootScope, $http) {
  $rootScope.$on('oauth2:login', function(event, token) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + token.access_token;
  });

  $rootScope.$on('oauth2:logout', function(event) {
    delete $http.defaults.headers.common.Authorization;
  });

  $rootScope.$on('oauth2:denied', function(event) {
    delete $http.defaults.headers.common.Authorization;
  });
});

