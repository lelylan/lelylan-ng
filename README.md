# Lelylan API for Node.js

AngularJS client library for [Lelylan API](http://dev.lelylan.com).


## What is Lelylan

Lelylan makes it easy for developers to monitor and control all devices in
your house providing a simple, self descriptive and consistent representation of them. Lelylan
maps every device in your house to a unique URI which will provide a simple access over it.


## What is AngualrJS

Lelylan makes it easy for developers to monitor and control all devices in
your house providing a simple, self descriptive and consistent representation of them. Lelylan
maps every device in your house to a unique URI which will provide a simple access over it.


### Get an access token

Before using Lelylan APIs you need to set the access token by using
[AngularJS OAuth2](https://github.com/andreareginato/lelylan-ng-oauth2). If you are not used to
OAuth2 concepts, check out the [dev center documentation](http://dev.lelylan.com/api/oauth#language=node).

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

### Lelylan access

Once you have the access token (you are logged in) you can access to the Lelylan API.
The following example shows the list of owned devices.

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

When using the [subscription](http://dev.lelylan.com/api/realtime#language=node) services (realtime)
you don't need an access token. In this case you need to set the client credentials.

```html
<html ng-app="lelylan">
<body>
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

### Suggested practices

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

**Devices** - The Device API defines a set of services to monitor and control every existing
device. Its final goal is to map every device to a unique URI which provides control over it.
[See examples](http://dev.lelylan.com/api/devices#angular).

**Activations** - Easy way to move the device ownership between people.
[See examples](http://dev.lelylan.com/api/devices#angular).

**Histories** - When a device updates its properties or executes a function a new history
resource with a snapshot of all device properties is created by Lelylan, also the ones that
has not been updated. This makes it easy to recreate previous device status and extract usage
patterns to improve the way people live their house.
[See examples](http://dev.lelylan.com/api/devices/histories#angular).

**Types** - A type describes the structure of a device. In its simplest form every type can be
defined as the combination of three key elements: properties (what vary during time), functions
(what a device can do), statuses (what a device is in a specific time of its life).
[See examples](http://dev.lelylan.com/api/types#angular).

**Properties** - A property is whatever vary in a device during time. It can be the intensity in
a dimmer, the temperature in a cooling system or the volume in a television.
[See examples](http://dev.lelylan.com/api/types/properties#angular).

**Functions** - Functions defines the daily interactions you have with the devices in your house,
for example when you turn on a light, close a door or raise the temperature in a room.
With functions you can control any device in the same way you do everyday of your life.
[See examples](http://dev.lelylan.com/api/types/functions#angular).

**Statuses** - Properties are not always enough to describe the status of a device. Think at a roller
shutter for example. It has the property aperture that is 100 when open or 0 when closed.
But what if the roller shutter is opening? It is nether open or close. To have a complete
control over the device status in a specific moment of its life is to use the status API.
[See examples](http://dev.lelylan.com/api/types/statuses#angular).

**Locations** - Locations are the places we live in and where physical devices are placed. Lelylan identifies
three types of locations usually organized in a hierarchical structure: houses, floors and
rooms.
[See examples](http://dev.lelylan.com/api/locations#angular).

**Physical Devices** - Physical devices are the real objects you physically interact with everyday of your life
like lights, appliances, alarms and more. To enable the communication between Lelylan and
physical devices they should provide a simple set of web services.
[See examples](http://dev.lelylan.com/api/physicals#angular).

**Subscriptions** - Get realtime updates by subscribing to a resource and its related event.
[See examples](http://dev.lelylan.com/api/realtime#angular).

**User Profile** - Returns extended information for the authenticated user.
[See examples](http://dev.lelylan.com/api/core#get-a-user-angular).


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
      <div class="error" ng-show="error">{{error.status}} {{error.message}}</div>
      <div class="error-401" ng-show="show==401">Your request is not authorized, please add the login first</div>
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

  <!--
  <script>
    var app = angular.module('app', ['lelylan']);
    app.value('lelylan.config', { endpoint: 'http://api.lelylan.com' });
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
* Run `testacular start` to execute all specs and execute all specs when a file change.


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
