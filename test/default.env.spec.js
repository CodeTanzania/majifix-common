'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const env = require(path.join(__dirname, '..', 'lib', 'env'));


describe('default', function () {

  describe('env', function () {
    it('should have default api version', function () {
      expect(env.API_VERSION).to.exist;
    });

    it('should have default locale', function () {
      expect(env.DEFAULT_LOCALE).to.exist;
    });

    it('should have default calling code', function () {
      expect(env.DEFAULT_CALLING_CODE).to.exist;
    });

    it('should have locales', function () {
      expect(env.LOCALES).to.exist;
      expect(env.LOCALES).to.be.an('array');
    });
  });
});


