'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const env = require(path.join(__dirname, '..', 'lib', 'env'));


describe('default', function () {

  describe('env', function () {
    it('should expose default api version', function () {
      expect(env.API_VERSION).to.exist;
    });

    it('should expose default locale', function () {
      expect(env.DEFAULT_LOCALE).to.exist;
    });

    it('should expose default calling code', function () {
      expect(env.DEFAULT_CALLING_CODE).to.exist;
    });

    it('should expose default country code', function () {
      expect(env.DEFAULT_COUNTRY_CODE).to.exist;
    });

    it('should expose locales', function () {
      expect(env.LOCALES).to.exist;
      expect(env.LOCALES).to.be.an('array');
    });

    it('should expose default content type', function () {
      expect(env.DEFAULT_CONTENT_TYPE).to.exist;
    });

    it('should expose content types', function () {
      expect(env.CONTENT_TYPES).to.exist;
      expect(env.CONTENT_TYPES).to.be.an('array');
    });

  });
});
