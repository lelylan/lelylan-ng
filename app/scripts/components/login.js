'use strict';

var directives = angular.module('lelylan.login', ['ngCookies'])

directives.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');;
}]);

directives.directive('login', ['AccessToken', 'ImplicitFlow', 'Profile', 'LoggedUser', '$location', '$cookies', '$rootScope',
  function(AccessToken, ImplicitFlow, Profile, LoggedUser, $location, $cookies, $rootScope) {

  var template =
    '<ul>' +
      '<li ng-show="show==\'loggedOut\'" class="login">' +
        '<a ng-href="{{endpoint}}">Login</a>' +
      '</li>' +
      '<li ng-show="show==\'loggedIn\'" class="welcome">' +
        'Welcome {{profile.email}}' +
      '</li>' +
      '<li ng-show="show==\'loggedIn\'" class="logout">' +
        '<a ng-click="logout()">Logout</a>' +
      '</li>' +
      '<li ng-show="show==\'preloading\'" class="preloading">' +
        'Signing In' +
      '</li>' +
    '</ul>';

  var definition = {
    restrict: 'E',
    replace: true,
    template: template,
    scope: {
      site: '@site',
      client: '@client',
      redirect: '@redirect',
      scope: '@scope',
      state: '@state',
      flow: '@flow' }
  };

  definition.link = function postLink(scope, element, attrs) {

    scope.show = 'preloading';

    scope.$watch('site', function(value) {
      initialize();
      var token = AccessToken.initialize();

      // Always login when there is the access token
      if (token.access_token) return scope.login();
      // Callback denying access token in the fragment URI
      if (token.error) return scope.deny();
      // First time on page (logged out)
      if (!getCookie() && !token.access_token && !token.error) return scope.logout();
      // Logged in refreshed page (need to redirect to oauth page)
      if (getCookie() && !token.access_token && !token.error) return scope.authorize();
    });

    scope.login = function() {
      showLogin();
      ImplicitFlow.restoreURL(scope);
      scope.profile = LoggedUser.set(Profile.get());
      setCookie('logged-in');
      fireLoginEvent();
    };

    scope.logout = function() {
      clear();
      fireLogoutEvent()
    };

    scope.deny = function() {
      clear();
      fireDeniedEvent()
    };

    scope.authorize = function() {
      window.location.replace(scope.endpoint);
    };

    var clear = function() {
      showLogout();
      deleteCookie();
      scope.profile = LoggedUser.set(null);
      AccessToken.delete();
    };

    var initialize = function() {
      scope.site = scope.site || 'http://people.lelylan.com';
      scope.flow = scope.flow || 'implicit';
      scope.authorizePath = scope.authorizePath || '/oauth/authorize';
      scope.tokenPath = scope.tokenPath || '/oauth/token';
      scope.scope = scope.scope || 'user';
      scope.endpoint = ImplicitFlow.url(scope);
    };

    var showLogin  = function() { scope.show = 'loggedIn'; }
    var showLogout = function() { scope.show = 'loggedOut'; }

    var getCookie    = function() { return $cookies[scope.client]; };
    var setCookie    = function(value) { $cookies[scope.client] = value; };
    var deleteCookie = function() { delete $cookies[scope.client]; };

    var fireLoginEvent  = function() { $rootScope.$broadcast('lelylan:login', AccessToken.get()); }
    var fireLogoutEvent = function() { $rootScope.$broadcast('lelylan:logout'); }
    var fireDeniedEvent = function() { $rootScope.$broadcast('lelylan:logout:denied'); }
  };

  return definition
}]);
