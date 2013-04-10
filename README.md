# Lelylan API for AngularJS

AngularJS client library for [Lelylan API](http://dev.lelylan.com).


## Introduction

### What is Lelylan

[Lelylan](http://lelylan.com) makes it easy for developers to monitor and control all devices
in your house providing a simple and consistent REST API.

### Why AngularJS

[AngularJS](http://angularjs.org/) lets you write client-side web applications as if you had
a smarter browser. It lets you use good old HTML as your template language and lets you extend
HTML’s syntax to express your application’s components clearly and succinctly.


## Getting Started

Include the lelylan-ng library and embed the
[Login Component](http://dev.lelylan.com/api/oauth#implicit-grant-angular)) using the `<login>` tag.
The following example gets all owned devices.

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
  <script src="//s.lelylan.com/angularjs/0.1.0/lelylan.min.js"/></script>
</body>
</html>
```

Using the login component the access token is automatically refreshed when expired.


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
services you must set the client credentials (no access token required).

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

Lelylan Resources fires a generic `lelylan:error` event whenever 4xx or 5xx status
code is returned. It also offers a granular error control throught by firing a
`lelylan:error:<status>` event for every specific error.

Through the error object you can access to the status code and a simpe error message.

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
  $scope.$on('lelylan:error:401', function(event) { $scope.error = '401'; });
}
</script>
```

Learn more about [errors on Lelylan](http://dev.lelylan.com/api/core#errors).


### Signed in user

Once the user signs in the <a href="http://api.lelylan.com/api/core#user-profile">profile resource</a>
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

Lelylan Configuration accepts an object with the following valid params.

* `endpoint` - A string that represents the API endpoint (`http://api.lelylan.com` by deafault).

Here a simple example where we change the API endpoint.

```html
<script>
  var app = angular.module('app', ['lelylan']);
  app.value('lelylan.config', { endpoint: 'http:///localhost\\:9000' });
</script>
```


### Spinner definition

Lelylan Client show any div with id 'lelylan-requests-loading' when a request is resolving.
Add a spinner inside this class whenever you need to give a visual feedback about an ongoing
request.


### Good practices

When creating a third party app made up from different modules, just define your own.
In this example we define `app`, which combines `lelylan` and `angular-ui`.

```html
<html ng-app="app">
<body>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/angularjs/0.1.0/lelylan.min.js"/></script>

  <script>angular.module('app', ['lelylan', 'ui'])</script>
</body>
</html>
```

Note the fact that the Angular App is now `ng-app="app"`.


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.


### Running specs

Unit tests.

* Fork and clone the repository.
* Intall [Yeoman](http://yeoman.io) and [PhantomJS](http://phantomjs.org/).
* Run `testacular start` to execute all unit tests.

E2e tests.

* Fork and clone the repository.
* Intall [Yeoman](http://yeoman.io) and [PhantomJS](http://phantomjs.org/).
* Run `yeoman server`
* Run `testacular start testacular.e2e.conf.js` to execute all e2e tests.

### Creating distribution

Run `yeoman build` to create the new distribution. All needed files will be places in 'dist/'.
Create a `lib/latest` folder into `app/` and save there the following files.

Run `yeoman build` to create the new distribution.
Run `yeoman server:dist` to see if everything works fine.

### Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.

### Feedback

Use the [issue tracker](http://github.com/lelylan/lelylan-ng/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.

### Links

* [GIT Repository](http://github.com/lelylan/lelylan-ng)
* [Lelylan Client Site](http://lelylan.github.com/lelylan-ng).
* [Lelylan Device Component](http://lelylan.github.com/device-component).
* [Lelylan Type Component](http://lelylan.github.com/type-component).
* [Lelylan Dev Center](http://dev.lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the following people for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/lelylan-ng/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](https://github.com/lelylan/lelylan-ng/blob/master/LICENSE.md) for details.
