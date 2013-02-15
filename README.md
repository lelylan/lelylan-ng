# Lelylan API for AngularJS

AngularJS client library for [Lelylan API](http://dev.lelylan.com).


## What is Lelylan

[Lelylan](http://lelylan.com) makes it easy for developers to monitor and control all devices
in your house providing a simple, self descriptive and consistent REST API.


## What is AngualrJS

[AngularJS](http://angularjs.org/) lets you write client-side web applications as if you had
a smarter browser. It lets you use good old HTML as your template language and lets you extend
HTML’s syntax to express your application’s components clearly and succinctly. It automatically
synchronizes data from your UI (view) with your JavaScript objects (model) through 2-way data
binding.


## Getting Started

Before using Lelylan APIs you need to get an access token and the fastest way to get one is to
use the `login` component. It takes care of all steps required by the [Implicit Flow](http://dev.lelylan.com/api/oauth#implicit-grant-angular))
and will guide the user through the autorization steps showing a login link.
Once the user has logged in, all Lelylan resource are accessible.

The following example shows all owned devices.

```html
<html ng-app="lelylan">
<body>

  <div ng-controller="LoginController">
    <login client="{{oauth.client}}" redirect="{{oauth.redirect}}" scope="{{oauth.scope}}" state="{{oauth.state}}"></login>
  </div>

  <script>
    function LoginController($scope) {
      $scope.oauth = { client: '<client-id>', redirect: '<redirect-uri>', scope: '<scope>', state: '<state>' };
    }
  </script>

  <div ng-controller="LelylanController">
    <div ng-repeat="device in devices">{{device.name}}</div>
  </div>

  <script>
    function LelylanController($scope, Device) {
      $scope.devices = Device.query();
    }
  </script>

  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
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
services you don't need an access token. In this case you need only the client credentials.

```html
<html ng-app="lelylan">
<body>

  <div ng-controller="LelylanController">{{subscription}}</div>

  <script>
    function LelylanController($scope, BasicAuth, Subscription) {
      BasicAuth.set({ id: '<client-id>', secret: '<client-secret>' });
      $scope.subscription = Subscription.get({ id: '<id>' });
    }
  </script>

  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/angularjs/0.1.0/lelylan.min.js"/></script>
</body>
</html>
```

### Errors

Lelylan Resources fires a generic `lelylan:error` event whenever 4xx or 5xx status
code is returned. It also offers a granular error control throught by firing a
`lelylan:error:<status>` event for every specific error.

Through the error object you can access to the status code and a simpe error message.

```html
<html ng-app="lelylan">
<body>

  <div ng-controller="LelylanController">
    <div>{{device}}</div>
    <div class="error 401" ng-show="error==401">
      Unauthorized request. Please, login first
    </div>
  </div>

  <script>
    function LelylanController($scope, Device) {
      $scope.device = Device.get({ id: '<id>' });
      $scope.$on('lelylan:error:401', function(event) { $scope.error = '401'; })
    }
  </script>

  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/angularjs/0.1.0/lelylan.min.js"/></script>
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

  <script>
    var app = angular.module('app', ['lelylan']);
    app.value('lelylan.config', { endpoint: 'http:///localhost\\:9000' });
  </script>

  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/angularjs/0.1.0/lelylan.min.js"/></script>
</body>
</html>
```


### Good practices

When creating a third party app made up from different modules, just define your own.
In this example we define `app`, which combines `lelylan` and `angular-ui`.

```html
<html ng-app="app">
<body>

  <script>angular.module('app', ['lelylan', 'ui'])</script>

  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-resource.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular-cookies.min.js"></script>
  <script src="//s.lelylan.com/angularjs/0.1.0/lelylan.min.js"/></script>
</body>
</html>
```

Note the fact that the Angular App is now `ng-app="app"`.


## Contributing

Fork the repo on github and send a pull requests with topic branches. Do not forget to
provide specs to your contribution.


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

* Run `yeoman build` to create the new distribution.
* Run `yeoman server:dist` to see if everything works fine.

Development in Javascript can be tricky sometimes. Keep what follows in mind.

* When adding new js files remember to add them in the `<!-- build:js -->` block
declared in `index.html`. If you don't add them, your tests will pass but your build
will not contain the new files.
* When making new tests do not warry about the loading part. The testacular config
file will automatically load for you all files in`test/spec`.

### Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.


### Feedback

Use the [issue tracker](http://github.com/lelylan/lelylan-ng/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.


### Links

* [GIT Repository](http://github.com/lelylan/lelylan-ng)
* [Lelylan Resources Website](http://lelylan.github.com/lelylan-ng).
* [Lelylan Dev Center](http://dev.lelylan.com)
* [Lelylan Site](http://lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the following people for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/lelylan-ng/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](https://github.com/lelylan/lelylan-ng/blob/master/LICENSE.md) for details.
