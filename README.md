# Lelylan API for Node.js

Node.js client library for [Lelylan API](http://dev.lelylan.com).

## What is Lelylan

Lelylan makes it easy for developers to monitor and control all devices in
your house providing a simple, self descriptive and consistent representation of them. Lelylan
maps every device in your house to a unique URI which will provide a simple access over it.

With Lelylan developers can build secure applications and services that use real-time data
coming from the real world to create the future connected house.


## Requirements

Node client library is tested against Node ~0.8.x


## Installation

Install the client library using [npm](http://npmjs.org/):

    $ npm install lelylan-node
    $ npm install simple-oauth2

Install the client library using git:

    $ git clone git://github.com/lelylan/lelylan-node.git
    $ cd lelylan-node
    $ npm install


## Getting started

### Get an access token

Before calling Lelylan APIs you need to set the access token using
[Simple OAuth2](https://github.com/andreareginato/simple-oauth2). If not used to OAuth2 concepts,
check out the [dev center documentation](http://dev.lelylan.com/api/oauth#language=node).

```javascript
// Set the client credentials and the OAuth2 server
var credentials = {
  clientID: '<client-id>',
  clientSecret: '<client-secret>',
  site: 'http://people.lelylan.com'
};

// Initialize the OAuth2 Library
var OAuth2 = require('simple-oauth2')(credentials);

// Authorization OAuth2 URI
// See available scopes here http://localhost:4000/api/oauth#scopes
var authorization_uri = OAuth2.AuthCode.authorizeURL({
  redirect_uri: '<redirect-uri>',
  scope: '<scopes>',
  state: '<state>'
});

console.log('Auhtorization URI', authorization_uri);
// => http://people.lelylan.com/oauth/authorize?
//      redirect_uri=<redirect-uri>&
//      scope=<scopes>&response_type=code&client_id=<client-id>

// Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
res.redirect(authorization_uri);

// Get the access token object (authorization code is given from the previous step)
var token;
OAuth2.AuthCode.getToken({
  code: '<code>',
  redirect_uri: '<client-id>'
}, function(error, result) {
  // Save the access token
  if (error) console.log('Access Token Error', error.message);
  token = OAuth2.AccessToken.create(result);
  console.log('Access Token', token);
});
```

### Lelylan access

Once you have the access token you can access to the Lelylan API. The
following example shows how to print in the console a list of owned devices.

```javascript
// Initialize Lelylan Node library
var Lelylan = require('lelylan-node')({ token: token });

// Get all devices
Lelylan.Device.all({}, function(error, response) {
  if (error) console.log('Lelylan Error', error.message);
  console.log(response);
  console.log(response.uri);
  console.log(response.properties[0].value);
});
```

Using a Simple OAuth2 AccessToken, the access token is automatically refreshed when it expires.


### Realtime services

When using the [subscription](http://dev.lelylan.com/api/realtime#language=node) services (realtime)
you don't need an access token. In this case you need to set the client credentials.

```javascript
// Setup credentials
credentials = { clientID: '<client-id>', clientSecret: '<client-secret>' };
Lelylan = require('lelylan-node')(credentials);

// Get all subscriptions
Lelylan.Subscriptions.all(function(error, response) {
  if (error) console.log('Lelylan Error', error.message);
  console.log(response)
})
```

### Implemented Services

**Devices** - The Device API defines a set of services to monitor and control every existing
device. Its final goal is to map every device to a unique URI which provides control over it.
[See examples](http://dev.lelylan.com/api/devices#node).

**Activations** - Easy way to move the device ownership between people.
[See examples](http://dev.lelylan.com/api/devices#node).

**Histories** - When a device updates its properties or executes a function a new history
resource with a snapshot of all device properties is created by Lelylan, also the ones that
has not been updated. This makes it easy to recreate previous device status and extract usage
patterns to improve the way people live their house.
[See examples](http://dev.lelylan.com/api/devices/histories#node).

**Types** - A type describes the structure of a device. In its simplest form every type can be
defined as the combination of three key elements: properties (what vary during time), functions
(what a device can do), statuses (what a device is in a specific time of its life).
[See examples](http://dev.lelylan.com/api/types#node).

**Properties** - A property is whatever vary in a device during time. It can be the intensity in
a dimmer, the temperature in a cooling system or the volume in a television.
[See examples](http://dev.lelylan.com/api/types/properties#node).

**Functions** - Functions defines the daily interactions you have with the devices in your house,
for example when you turn on a light, close a door or raise the temperature in a room.
With functions you can control any device in the same way you do everyday of your life.
[See examples](http://dev.lelylan.com/api/types/functions#node).

**Statuses** - Properties are not always enough to describe the status of a device. Think at a roller
shutter for example. It has the property aperture that is 100 when open or 0 when closed.
But what if the roller shutter is opening? It is nether open or close. To have a complete
control over the device status in a specific moment of its life is to use the status API.
[See examples](http://dev.lelylan.com/api/types/statuses#node).

**Locations** - Locations are the places we live in and where physical devices are placed. Lelylan identifies
three types of locations usually organized in a hierarchical structure: houses, floors and
rooms.
[See examples](http://dev.lelylan.com/api/locations#node).

**Physical Devices** - Physical devices are the real objects you physically interact with everyday of your life
like lights, appliances, alarms and more. To enable the communication between Lelylan and
physical devices they should provide a simple set of web services.
[See examples](http://dev.lelylan.com/api/physicals#node).

**Subscriptions** - Get realtime updates by subscribing to a resource and its related event.
[See examples](http://dev.lelylan.com/api/realtime#node).

**User Profile** - Returns extended information for the authenticated user.
[See examples](http://dev.lelylan.com/api/core#get-a-user-node).


### Errors

Exceptions are raised when a 4xx or 5xx status code is returned.

    HTTPError

Through the error message attribute you can access the JSON representation
made by the HTTP `status` and an error `message`.

```javascript
Lelylan.Device.all({}, function(error, response) {
  if (error) console.log('Lelylan Error', error.message.message);
})
```

The `error.message` object contains the `status` and the `message` properties.
401, 403, 404, 422 responses has also a valid `response` object.
Learn more about [errors on Lelylan](http://dev.lelylan.com/api/core#errors).


### Configurations

Lelylan Configuration accepts an object with the following valid params.

* `token` - A [Simple OAuth2 AccessToken](http://andreareginato.github.com/simple-oauth2/#getting-started/access-token-object) object.
* `clientID` - A string that represents the registered Client ID.
* `clientSecret` - A string that represents the registered Client secret.
* `endpoint` - A string that represents the API endpoint (`api.lelylan.com` by deafault).

Here a simple example where we change the API endpoint.

```javascript
options = { 'endpoint' : 'http://localhost:8000' }
Lelylan = require('lelylan')(options);
```

To directly access to the config object use the `#config` method.

```javascript
var rawToken = Lelylan.config.token.token
```


## Contributing

Fork the repo on github and send a pull requests with topic branches. Do not forget to
provide specs to your contribution.


### Running specs

* Fork and clone the repository.
* Run `npm install` for dependencies.
* Run `npm test` to execute all specs.
* Run `make test-watch` to auto execute all specs when a file change.

### Running locally

```
$ git clone https://github.com/lelylan/lelylan-rb
$ cd lelylan-rb
$ node
$ > var lelylan = require('./lib/lelylan-node.js')();
```

### Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.


### Feedback

Use the [issue tracker](http://github.com/lelylan/lelylan-node/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.


### Links

* [GIT Repository](http://github.com/lelylan/lelylan-node)
* [Lelylan Node Website](http://lelylan.github.com/lelylan-node).
* [Lelylan Dev Center](http://dev.lelylan.com)
* [Lelylan Site](http://lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the following people for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/lelylan-node/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](https://github.com/lelylan/lelylan-node/blob/master/LICENSE.md) for details.
