'use strict';

describe('<login>', function() {

  var page = '../../../mocks/login.html';

  describe('when receives the access token', function() {

    beforeEach(function() {
      var fragment = '#access_token=token&token_type=bearer&expires_in=7200&state=state5c6007a2/mocks/login.html?ae9e08740b008e974ece9e08740dc1384ea1fe9e08740g';
      browser().navigateTo(page + fragment);
    });

    it('shows the logout message', function() {
      expect(element('.logout').text()).toEqual('Logout alice@wonderland.com');
      expect(element('.logout').css('display')).toEqual('list-item');
    });

    it('does not show the login', function() {
      expect(element('.login').css('display')).toEqual('none');
    });

    it('removes the fragment from the URI', function() {
      expect(browser().location().url()).toEqual('/mocks/login.html?a=b#c=d&f=g');
    });

    it('fires the event lelylan:login', function() {
      expect(element('.message').text()).toEqual('Signed in with token token');
    });

    describe('when logs out', function() {

      beforeEach(function() { element('.logout a').click(); });

      it('fires the event lelylan:logout', function() {
        expect(element('.message').text()).toBe('Signed out');
      });
    });

    describe('when the authorization is denied', function() {

      beforeEach(function() {
        var fragment = '#error=access_denied&error_description=The+resource+owner+or+authorization+server+denied+the+request.&state=remember-me';
        browser().navigateTo(page + fragment);
      });

      it('fires the event lelylan:access:denied', function() {
        expect(element('.message').text()).toEqual('Access denied');
      });
    });

    //describe('when the access token expires', function() {

      //beforeEach(function() {
        //var fragment = '#access_token=token&token_type=bearer&expires_in=0&state=state5c6007a2/mocks/login.html';
        //browser().navigateTo('../../app/login.html' + fragment);
      //});

      //it('automatically refresh the token', function() {
        //expect(browser().location().url()).toEqual('');
      //});
    //});
  });
});
