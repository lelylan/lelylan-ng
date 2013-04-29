# Lelylan API for AngularJS

AngularJS client library for [Lelylan API](http://dev.lelylan.com).


## Introduction

### What is Lelylan

[Lelylan](http://lelylan.com) makes it easy for developers to monitor and control all devices
in your house providing a simple and consistent REST API.

### What is a Type

A type describes the structure of a device. In its simplest form every type can be defined as
the combination of three key elements: properties, functions and statuses.
[Learn more about](http://dev.lelylan.com/api/types).
### Why AngularJS

[AngularJS](http://angularjs.org/) lets you write client-side web applications as if you had
a smarter browser. It lets you use good old HTML as your template language and lets you extend
HTML’s syntax to express your application’s components clearly and succinctly.


## Distributions

The library is released in the following distributions.

* [lelylan-ng.min.js](//s.lelylan.com/lelylan-ng/0.1.0/lelylan-ng.min.js) (minified)
* [lelylan-ng.js](//s.lelylan.com/lelylan-ng/0.1.0/lelylan-ng.js) (not minified)


## Getting Started

Require the `lelylan-ng` library and embed the
[login component](http://dev.lelylan.com/api/oauth#implicit-grant-angular)) using the `<login>` tag.

```html
<html ng-app="lelylan">
<body>
  <!-- Login component -->
  <login client="<client-id>" redirect="<redirect-uri>" scope="<scope>" state="<state>"></login>
  <!-- Visualize owned devices name -->
  <div ng-controller="LelylanController">
    <h1>Devices</h1>
    <div ng-repeat="device in devices">{{device.name}}</div>
  </div>
  <!-- Gets owned device -->
  <script>
    function LelylanController($scope, Device) {
      $scope.devices = Device.query();
    }
  </script>
  <!-- Javascript libraries -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/lelylan-ng/0.1.0/lelylan-ng.min.js"/></script>
</body>
</html>
```

The login component automatically refreshed the access token when it expires.


### Promises

Every request returns a [Resource](http://code.angularjs.org/1.1.3/docs/api/ngResource.$resource)
or a collection of them. Each one contains additional properties.

* `$then`: the `then` method of a [promise](http://code.angularjs.org/1.1.3/docs/api/ng.$q) derived from the underlying $http call.
* `$resolved`: `true` if the promise has been resolved (either with success or rejection);

```html
<div ng-controller="LelylanController">
  <div ng-show="message">{{message}}</div>
  <div ng-repeat="device in devices">{{device.id}}</div>
</div>

<script>
  function LelylanController($scope, Device) {
    var success = function(response) { $scope.devices = response.resource; };
    var error   = function(error) { $scope.message = 'An error has occurred'; };

    var request = Device.query();
    request.$then(success, error);
  }
</script>
```

### Implemented Services

Learn how to use Lelylan and AngulasJS in deep.

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
- [x] [OAuth2](http://dev.lelylan.com/api/oauth#implicit-grant-angular).


### Realtime services

When using the [subscription](http://dev.lelylan.com/api/realtime#language=angular)
service you need to set the client credentials (no access token required).

```html
<div ng-controller="LelylanController">{{subscription}}</div>
<script>
function LelylanController($scope, BasicAuth, Subscription) {
  BasicAuth.set({ clientID: '<client-id>', clientSecret: '<client-secret>' });
  $scope.subscription = Subscription.get({ id: '<id>' });
}
</script>
```

### Errors

Lelylan Resources fires a generic `lelylan:error` event whenever a 4xx or 5xx status code is
returned. It also gives you granular error control by firing a `lelylan:error:<status>` event for
every specific error. An object containing the following params is sent to the listener event.

* `status` - HTTP status code
* `meassage` - Descriptive error message

```html
<div ng-controller="LelylanController">
  <div>{{device}}</div>
  <div class="error 401" ng-show="error==401">
    Unauthorized request. Please, login first.
  </div>
</div>

<script>
function LelylanController($scope, Device) {
  $scope.device = Device.get({ id: '<id>' });
  $scope.$on('lelylan:error:401', function(error) { $scope.error = '401'; });
}
</script>
```

Learn more about [errors on Lelylan Dev Center](http://dev.lelylan.com/api/core#errors).

### OAuth2 configurations

The login compoent accepts the following attributes.

* `redirect` - [Registered](http://localhost:3000/oauth/applications) application URI where the user is redirected after authorization.
* `client` - [Registered](href="http://localhost:3000/oauth/applications) Client ID.
* `scope` - Application privileges. Learn more about [valid scopes](http://localhost:4000/api/oauth#scopes) in Lelylan.
* `state` - Optional opaque value used by the client to maintain state between the request and callback
* `site` - A string that represents the authorization endpoint. `http://people.lelylan.com` by deafault.
* `text` - The login description. `Sign In` by deafault.

```html
<div ng-controller = "LoginController">
  <login client="{{oauth.client}}" redirect="{{oauth.redirect}}" scope="{{oauth.scope}}"></login>
</div>

<script>
  function LoginController($scope) {
    $scope.oauth = { client: '<client-id>', redirect: '<redirect-uri>', scope: '<scope>' };
  }
</script>
```

### OAuth2 events

Lelylan client fires the following events.

* `lelylan:login` - the user has authorized the third party app.
The listener receives the [access token](dev.lelylan.com/api/oauth#implicit-grant-angular) obect.
* `lelylan:login:denied` - the user has not authorized the third party app
* `lelylan:logout` - the user has logged out

```javascript
function LelylanController($scope) {
  $scope.$on('lelylan:login', function(event, token) {
    console.log('The user authorized the third party app with access token' + token.access_token);
  });

  $scope.$on('lelylan:logout', function(event) {
    console.log('The user has signed out');
  });

  $scope.$on('lelylan:logout:denied', function(event) {
    console.log('The user did not authorize the third party app');
  });
}
```

### Signed in user

When a user signs in, the [profile](http://api.lelylan.com/api/core#user-profile)
is cached into the `LoggedUser` service.

```html
<div ng-controller="LelylanController">
  Welcome {{me.full_name}}
</div>

<script>
function LelylanController($scope, LoggedUser) {
  $scope.me = LoggedUser.get();
}
</script>
```

### Configurations

Lelylan Configuration accepts the following options.

* `endpoint` - A string that represents the API endpoint (`http://api.lelylan.com` by deafault).

```html
<script>
  var app = angular.module('app', ['lelylan']);
  app.value('lelylan.config', { endpoint: 'http:///localhost\\:9000' });
</script>
```

### Loading notification

When a request is sent any HTML element with id `lelylan-request-loading` shows up until the
request is resolved. Its a good practice to place a spinner into this element to communicate to
the user that something is happening.

### Good practices

When creating a third party app made up from different modules, just define your own.
In this example we define `app`, which combines `lelylan` and `angular-ui`.

```html
<html ng-app="app">
<body>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/lelylan-ng/0.1.0/lelylan.min.js"/></script>

  <script>angular.module('app', ['lelylan', 'ui'])</script>
</body>
</html>
```

Note the fact that the Angular App is now `ng-app="app"`.


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.


### Running specs

* Fork and clone the repository
* Install [Yeoman](http://yeoman.io) and [PhantomJS](http://phantomjs.org/)
* Run `grunt test`

When developing use the following tasks (watch option active).

* `grunt unit` for unit tests
* `grunt e2e` for e2e tests

### Creating your own distribution

* Fork and clone the repository
* Install [Yeoman](http://yeoman.io) and [PhantomJS](http://phantomjs.org/)
* Run `grunt`

The new distribution files will be created in 'dist/'.

### Stubbing

In `test/html` you can find the stubbed versions of lelylan-ng where all HTTP request are
simulated to be able to work in isolation.

* Run `grunt server`

And then open the following pages to live test lelylan-ng.

* [Login component signed in](http://localhost:3100/html/index.html#access_token=token&token_type=bearer&expires_in=7200&state=state5c6007a2/html/index.html)
* [Login component not signed in](http://localhost:3100/html/index.html)
* [Events](http://localhost:3100/html/events.html)
* [Spinner](http://localhost:3100/html/spinner.html)

### Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.

### Feedback

Use the [issue tracker](http://github.com/lelylan/lelylan-ng/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.

### Links

* [GIT Repository](http://github.com/lelylan/lelylan-ng)
* [Site](http://lelylan.github.com/lelylan-ng)
* [Lelylan Device Component](http://lelylan.github.com/device-component)
* [Lelylan Type Component](http://lelylan.github.com/type-component)
* [Lelylan Dev Center](http://dev.lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the [all people](https://github.com/lelylan/lelylan-ng/contributors) submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/lelylan-ng/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](https://github.com/lelylan/lelylan-ng/blob/master/LICENSE.md) for details.
