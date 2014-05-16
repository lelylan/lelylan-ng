# Lelylan Client for AngularJS

AngularJS client library for [Lelylan API](http://dev.lelylan.com).

### What is Lelylan?

[Lelylan](http://lelylan.com) makes it easy for developers to monitor and control all devices
in your house providing a simple and consistent REST API.


## Installation

`bower install lelylan-ng --save`


## Getting Started

```html
<html ng-app="example">
  <body>

    <!-- OAuth2 directive -->
    <oauth2
      site="http://people.lelylan.com"
      client-id="&lt;client-id&gt;"
      redirect-uri="http://redirect.example.com"
      scope="devices"
      profile="http://api.lelylan.com/me">
    </oauth2>

    <!-- Show the owned devices -->
    <div ng-controller="ExampleController">
      <div ng-repeat="device in devices">{{device.name}}</div>
    </div>

    <!-- Gets the owned device -->
    <script>
      function ExampleController($scope, Device) {
        Device.query().success(function(data) { $scope.devices = response });
      }
    </script>

    <script>
      angular.module('example', ['lelylan.client']);
    </script>
  </body>
</html>
```

[Learn more](http://dev.lelylan.com/developers/#oauth-implicit-grant-angular)
about how the OAuth2 directive works.


## $http requests

Every requests generates an HTTP request and returns a [promise](https://docs.angularjs.org/api/ng/service/$http)
with two $http specific methods: `success` and `error`.

```
Device.query().
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
```

Note: lelylan-ng takes the access token from the oauth2 directive.


## Implemented Services

All methods are fully descibed in the [Dev Cener](http://dev.lelylan.com#angular).

- [x] [Devices](http://dev.lelylan.com/developers#devices-api-angular)
- [x] [Activations](http://dev.lelylan.com/developers#activations-api-angular)
- [x] [Types](http://dev.lelylan.com/types#types-api-angular)
- [x] [Properties](http://dev.lelylan.com/types#properties-api-angular)
- [x] [Functions](http://dev.lelylan.com/types#functions-api-angular)
- [x] [Statuses](http://dev.lelylan.com/types#statuses-api-angular)
- [x] [Subscriptions](http://dev.lelylan.com/developers#subscriptions-api-angular)
- [x] [Profile](http://dev.lelylan.com/developers#core-concepts-get-me-angular)


## Links

* [GIT Repository](http://github.com/lelylan/lelylan-ng)
* [OAuth2 directive](https://github.com/andreareginato/oauth-ng)
* [Lelylan Dev Center](http://dev.lelylan.com)


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.

### Setup

* Fork and clone the repository
* Run `npm install`

### Unit tests (karma)

* `grunt karma:unit`

### Creating your own distribution

* Fork and clone the repository
* Run `npm install`
* Run `grunt`

The new distribution files will be created in the `dist/` folder.

### Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.

### Feedback

Use the [issue tracker](http://github.com/lelylan/lelylan-ng/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that
can improve the project.

## Authors

[Andrea Reginato](http://twitter.com/andreareginato)

## Contributors

Special thanks to all [contributors](https://github.com/lelylan/lelylan-ng/contributors)
for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/lelylan-ng/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2014 [Lelylan](http://lelylan.com).
See [LICENSE](https://github.com/lelylan/lelylan-ng/blob/master/LICENSE.md) for details.
