'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declaration */
const phone = require(path.join(__dirname, '..', 'lib', 'phone'));
const common = require(path.join(__dirname, '..'));

describe('phone', () => {

  before(() => {
    process.env.DEFAULT_COUNTRY_CODE = 'TZ';
  });

  it('should expose toE164 formatter', () => {
    expect(phone.toE164).to.exist;
    expect(phone.toE164).to.be.a('function');
  });

  it('should use default country code', () => {
    const phoneNumber = phone.toE164('0714969698');
    expect(phoneNumber).to.exist;
    expect(phoneNumber).to.be.eql('255714969698');
  });

  it('should use country code param', () => {
    const phoneNumber = phone.toE164('0714969698', 'KE');
    expect(phoneNumber).to.exist;
    expect(phoneNumber).to.be.eql('254714969698');
  });

  it('should be exported', () => {
    expect(common).to.exist;
    expect(common.phone).to.exist;
    expect(common.phone).to.be.eql(phone);
  });

});
