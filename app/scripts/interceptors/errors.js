// Inspired by https://github.com/witoldsz/angular-http-auth/blob/master/src/angular-http-auth.js
angular.module('lelylan.errors', [])
  .config(['$httpProvider', function($httpProvider) {

  var statusCodes = {
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Long",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      420: "Enhance Your Calm",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Unordered Collection",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      444: "No Response",
      449: "Retry With",
      499: "Client Closed Request",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
    };

    var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
      function success(response) { return response; }
      function error(response) {
        if (response.status >= 400) {
          var error =  { status: response.status, message: statusCodes[response.status] };
          $rootScope.$broadcast('lelylan:error', error);
          $rootScope.$broadcast('lelylan:error:' + response.status, error);
          var deferred = $q.defer();
          return deferred.promise;
        };
        return $q.reject(response);
      };
      return function(promise) { return promise.then(success, error); }
    }];

    $httpProvider.responseInterceptors.push(interceptor);
  }]);

