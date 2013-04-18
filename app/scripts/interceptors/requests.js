angular.module('lelylan.requests', [])
.config(['$httpProvider', function($httpProvider) {
  var $http, interceptor = ['$q', '$injector', function ($q, $injector) {
    var requestError;

    var toggle = function(id, action) {
      if (window.document.getElementById(id)) {
        window.document.getElementById(id).style.display = action;
      }
    }

    function success(response) {
      $http = $http || $injector.get('$http'); // HACK: get $http via $injector because of circular dependency problem
      if ($http.pendingRequests.length < 1) {
        toggle('lelylan-request-loading', 'none');
      }
      return response;
    }

    function requesterror(response) {
      $http = $http || $injector.get('$http'); // HACK: get $http via $injector because of circular dependency problem
      if ($http.pendingRequests.length < 1) {
        toggle('lelylan-request-loading', 'none');
        toggle('lelylan-request-error', 'none');
      };
      return $q.reject(response);
    }

    return function (promise) {
      toggle('lelylan-request-loading', 'block')
      return promise.then(success, requestError);
    }
  }];

  $httpProvider.responseInterceptors.push(interceptor);
}]);
