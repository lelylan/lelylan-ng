'use strict';

describe('Errors', function() {

  var page = '../../../mocks/errors.html';

  describe('when makes an unauthorized request', function() {

    beforeEach(function() {
      var fragment = '#access_token=token&token_type=bearer&expires_in=7200&state=state5c6007a2/mocks/login.html?ae9e08740b008e974ece9e08740dc1384ea1fe9e08740g';
      browser().navigateTo(page + fragment);
    });

    it('returns the error status and the error message', function() {
      expect(element('.error').text()).toEqual('401 Unauthorized');
    });

    it('raises general lelylan:error event', function() {
      expect(element('.error').css('display')).toEqual('block');
    });

    it('raises specific lelylan:error:401 event', function() {
      expect(element('.error-401').css('display')).toEqual('block');
    });

    it('does not raise unrelated lelylan:error:404 event', function() {
      expect(element('.error-404').css('display')).toEqual('none');
    });
  });
});
