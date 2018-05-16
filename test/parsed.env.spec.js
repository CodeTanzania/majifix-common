'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

const API_VERSION = process.env.API_VERSION = '1.0.1';
const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE = 'sw';
const DEFAULT_CALLING_CODE = process.env.DEFAULT_CALLING_CODE = '254';

/* declarations */
const env = require(path.join(__dirname, '..', 'lib', 'env'));

describe('parsed', function () {

  describe('env', function () {
    it('should use default api version', function () {
      expect(env.API_VERSION).to.exist;
      expect(env.API_VERSION).to.be.equal(API_VERSION);
    });

    it('should use default locale value set by a user', function () {
      expect(env.DEFAULT_LOCALE).to.exist;
      expect(env.DEFAULT_LOCALE).to.be.equal(DEFAULT_LOCALE);
    });

    it('should use default calling code value set by user', function () {
      expect(env.DEFAULT_CALLING_CODE).to.exist;
      expect(env.DEFAULT_CALLING_CODE).to.be.equal(DEFAULT_CALLING_CODE);
    });
  });

});
