# Lelylan API for AngularJS

AngularJS client library for [Lelylan API](http://dev.lelylan.com).


## What is Lelylan

Lelylan makes it easy for developers to monitor and control all devices in
your house providing a simple, self descriptive and consistent representation of them. Lelylan
maps every device in your house to a unique URI which will provide a simple access over it.


## What is AngualrJS

AngularJS lets you write client-side web applications as if you had a smarter browser.
It lets you use good old HTML as your template language and lets you extend HTML’s syntax
to express your application’s components clearly and succinctly. It automatically synchronizes
data from your UI (view) with your JavaScript objects (model) through 2-way data binding.
[Learn more about](http://angularjs.org/).


### Get an access token

Before using Lelylan APIs you need to set the access token by using
[AngularJS OAuth2](https://github.com/andreareginato/lelylan-ng-oauth2). If you are not used to
OAuth2 concepts, check out the [dev center documentation](http://dev.lelylan.com/api/oauth#language=angular).

```html
<html ng-app="lelylan">
<body>

  <!-- Login (using OAuth2) -->
  <div ng-controller = "LoginController">
    <login credentials = "{{credentials}}"></login>
  </div>

  <script>
    function LoginController($scope) {
      $scope.credentials = {
        client:   '<client-id>',
        redirect: '<redirect-uri>',
        scope:    '<scope>',
        state:    '<state>' };
    }
  </script>

  <!-- Angular and Lelylan libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-resources.min.js"/></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-oauth2.min.js"/></script>
</body>
</html>
```

### Lelylan API

Once you have the access token (you are logged in) you can access to the Lelylan API.
The following example shows the list of owned devices.

```html
<html ng-app="lelylan">
<body>

  <!-- Login (using OAuth2) -->
  <div ng-controller = "LoginController">
    <login credentials ="{{credentials}}"></login>
  </div>

  <script>
    function LoginController($scope) {
      $scope.credentials = {
        client:   '<client-id>',
        redirect: '<redirect-uri>',
        scope:    '<scope>',
        state:    '<state>' };
    }
  </script>

  <!-- Lelylan resources access -->
  <div ng-controller="LelylanController">
    <div ng-repeat="device in devices">{{device}}</div>
  </div>

  <script>
    function LelylanController($scope, Device) {
      $scope.device = Device.query({ 'properties[value]': 'on' });
    }
  </script>

  <!-- Angular and Lelylan libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-resources.min.js"/></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-oauth2.min.js"/></script>
</body>
</html>
```

Using AngualrJS Lelylan Resources, the access token is automatically refreshed when it expires.


### Realtime services

When using the [subscription](http://dev.lelylan.com/api/realtime#language=angular) services (realtime)
you don't need an access token. In this case you need to set the client credentials.

```html
<html ng-app="lelylan">
<body>

  <!-- Lelylan resources access -->
  <div ng-controller="LelylanController">{{subscription}}</div>

  <script>
    function LelylanController($scope, BasicAuth, Subscription) {
      var credentials = { id: '<client-id>', secret: '<client-secret>' };
      BasicAuth.set(credentials);

      $scope.subscription = Subscription.get({ id: '<id>' });
    }
  </script>

  <!-- Angular and Lelylan libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-resources.min.js"/></script>
</body>
</html>
```

### Good practices

When creating a third party app with different libraries, just define your own.

```html
<html ng-app="app">
<body>

  <script>angular.module('app', ['lelylan', 'ui'])</script>

  <!-- Angular and Lelylan libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-resources.min.js"/></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-oauth2.min.js"/></script>
</body>
</html>
```

Note how the Angular App is now `ng-app="app"`.


### Implemented Services

- [x] [Devices](http://dev.lelylan.com/api/devices#angular).
- [x] [Activations](http://dev.lelylan.com/api/devices#angular).
- [x] [Histories](http://dev.lelylan.com/api/devices/histories#angular).
- [x] [Types](http://dev.lelylan.com/api/types#angular).
- [x] [Properties](http://dev.lelylan.com/api/types/properties#angular).
- [x] [Functions](http://dev.lelylan.com/api/types/functions#angular).
- [x] [Statuses](http://dev.lelylan.com/api/types/statuses#angular).
- [x] [Locations](http://dev.lelylan.com/api/locations#angular).
- [x] [Physical devices](http://dev.lelylan.com/api/physicals#angular).
- [x] [Subscriptions](http://dev.lelylan.com/api/realtime#angular).
- [x] [User Profile](http://dev.lelylan.com/api/core#get-a-user-angular).


### Errors

Lelylan Resources fires a generic `lelylan:error` event whenever 4xx or 5xx status
code is returned. It also offers a granular error control throught by firing a
`lelylan:error:<status>` event for every specific error.

Through the error object you can access to the status code and a simpe error message.

```html
<html ng-app="lelylan">
<body>

  <!-- Lelylan errors -->
  <div ng-controller="LelylanController">
    <div>{{device}}</div>
    <div class="error" ng-show="error">{{error.status}} {{error.message}}</div>
    <div class="error-401" ng-show="show==401">Unauthorized request. Please, login first</div>
  </div>

  <script>
    function LelylanController($scope, Device) {
      $scope.device = Device.get({ id: '<id>' });
      $scope.$on('lelylan:error', function(event, error) { $scope.error = error; });
      $scope.$on('lelylan:error:401', function(event) { $scope.show = '401'; })
    }
  </script>

  <!-- Angular and Lelylan libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-resources.min.js"/></script>
</body>
</html>
```

Learn more about [errors on Lelylan](http://dev.lelylan.com/api/core#errors).


### Configurations

Lelylan Configuration accepts an object with the following valid params.

* `endpoint` - A string that represents the API endpoint (`http://api.lelylan.com` by deafault).

Here a simple example where we change the API endpoint.

```html
<html ng-app="app">
<body>

  <!-- Lelylan configuration -->
  <script>
    var app = angular.module('app', ['lelylan']);
    app.value('lelylan.config', { endpoint: 'http:///localhost\\:9000' });
  </script>

  <!-- Angular and Lelylan libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-resources.min.js"/></script>
  <script src="//cdn.lelylan.com/angular/0.1/lelylan-oauth2.min.js"/></script>
</body>
</html>
```


## Contributing

Fork the repo on github and send a pull requests with topic branches. Do not forget to
provide specs to your contribution.


### Running specs

* Fork and clone the repository.
* Intall [Yeoman](http://yeoman.io/gettingstarted_1.0.html).
* Run `testacular start` to execute all specs and reload all specs when a file change.


### Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.


### Feedback

Use the [issue tracker](http://github.com/lelylan/lelylan-ng-resources/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.


### Links

* [GIT Repository](http://github.com/lelylan/lelylan-ng-resources)
* [Lelylan Resources Website](http://lelylan.github.com/lelylan-ng-resources).
* [Lelylan Dev Center](http://dev.lelylan.com)
* [Lelylan Site](http://lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the following people for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/lelylan-ng-resources/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](https://github.com/lelylan/lelylan-ng-resources/blob/master/LICENSE.md) for details.
