# Changelog

## v0.1.8 (January 25, 2013)

* Fixed bug about client naming for realtime service

## v0.1.7 (January 25, 2013)

* Update credentials for clients to naming used by simple oauth2

## v0.1.6 (January 25, 2013)

* Added public method to type, properties, functions and statuses

## v0.1.5 (January 25, 2013)

* Fixed missing Basic Auth. For some wierd reason it is not created
from the request library

## v0.1.4 (January 25, 2013)

* Moved Simple OAuth2 dependency to dev. In this way we totally decouple
the OAuth mechanism from Lelylan services.

## v0.1.3 (January 25, 2013)

* Fixed bug on index.js referencing the wrong file

## v0.1.2 (January 24, 2013)

* Fixed bug on parsing JSON for GET and DELETE requests
* Refactoring all tests to make more reliable
* Fixed activation definition which was wrong
* Added tests for public services (they do not need access token)

## v0.1.1 (January 24, 2013)

* Added Lelylan.Profile.me to get authenticated user profile
* Minor changes on cleaning up sent data to Lelylan

## v0.1.0 (January 23, 2013)

* First version Node client for Lelylan API
