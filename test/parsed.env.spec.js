'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

const API_VERSION = process.env.API_VERSION = '1.0.1';
const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE = 'sw';
const DEFAULT_CALLING_CODE = process.env.DEFAULT_CALLING_CODE = '254';
const DEFAULT_COUNTRY_CODE = process.env.DEFAULT_COUNTRY_CODE = 'US';
process.env.LOCALES = 'en,sw,fr';
process.env.DEFAULT_AGE = 14;
process.env.ALLOWED_AGES = '14,15, 16';
process.env.CONTENT_TYPES = 'FAQ,Tariff';

/* declarations */
const env = require(path.join(__dirname, '..', 'lib', 'env'));
const { getNumber, getArray, getString, getStrings, getNumbers } = env;

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
      expect(env.DEFAULT_CALLING_CODE)
        .to.be.equal(DEFAULT_CALLING_CODE);
    });

    it('should use default country code value set by user', function () {
      expect(env.DEFAULT_COUNTRY_CODE).to.exist;
      expect(env.DEFAULT_COUNTRY_CODE)
        .to.be.equal(DEFAULT_COUNTRY_CODE);
    });

    it('should use locales set by a user', function () {
      const locales = ['en', 'sw', 'fr'];
      expect(env.LOCALES).to.exist;
      expect(env.LOCALES).to.be.an('array');
      expect(env.LOCALES).to.have.length(3);
      expect(env.LOCALES).to.have.members(locales);
    });

    it('should use content types set by a user', function () {
      const contentTypes = ['Post', 'FAQ', 'Tariff'];
      expect(env.CONTENT_TYPES).to.exist;
      expect(env.CONTENT_TYPES).to.be.an('array');
      expect(env.CONTENT_TYPES).to.have.length(3);
      expect(env.CONTENT_TYPES).to.have.members(contentTypes);
    });

  });

  describe('helpers', function () {

    it('should be able to get raw value', function () {
      const value = env('LOCALES');
      expect(value).to.exist;
      expect(value).to.be.equal(process.env.LOCALES);
    });

    it('should be able to get raw value', function () {
      const value = env('Any', 'Any');
      expect(value).to.exist;
      expect(value).to.be.equal('Any');
    });

    it('should be able to get string value', function () {
      const value = getString('DEFAULT_COUNTRY_CODE');
      expect(value).to.exist;
      expect(value).to.be.a('string');
      expect(value).to.be.equal('US');
    });

    it('should be able to get string value', function () {
      const value = getString('DEFAULT_CITY', 'Dar es salaam');
      expect(value).to.exist;
      expect(value).to.be.a('string');
      expect(value).to.be.equal('Dar es salaam');
    });

    it('should be able to get number value', function () {
      const value = getNumber('DEFAULT_AGE');
      expect(value).to.exist;
      expect(value).to.be.a('number');
      expect(value).to.be.equal(14);
    });

    it('should be able to get number value', function () {
      const value = getNumber('DEFAULT_PRICE', 55.11);
      expect(value).to.exist;
      expect(value).to.be.a('number');
      expect(value).to.be.equal(55.11);
    });

    it('should be able to get array value', function () {
      const value = getArray('LOCALES');
      expect(value).to.exist;
      expect(value).to.be.an('array');
      expect(value).to.be.eql(['en', 'sw', 'fr']);
    });

    it('should be able to get array value', function () {
      const value = getArray('ANIMALS', ['elephant']);
      expect(value).to.exist;
      expect(value).to.be.an('array');
      expect(value).to.be.eql(['elephant']);
    });

    it('should be able to get array of strings', function () {
      const value = getStrings('ALLOWED_AGES');
      expect(value).to.exist;
      expect(value).to.be.an('array');
      expect(value).to.be.eql(['14', '15', '16']);
    });

    it('should be able to get array of numbers', function () {
      const value = getNumbers('ALLOWED_AGES');
      expect(value).to.exist;
      expect(value).to.be.an('array');
      expect(value).to.be.eql([14, 15, 16]);
    });

  });

});
