import { expect } from '@lykmapipo/mongoose-test-helpers';
import {
  // models
  MODEL_NAME_ACCOUNT,
  MODEL_NAME_ALERT,
  MODEL_NAME_CONTENT,
  MODEL_NAME_CHANGELOG,
  MODEL_NAME_ITEM,
  MODEL_NAME_JURISDICTION,
  MODEL_NAME_PARTY,
  MODEL_NAME_PERMISSION,
  MODEL_NAME_PREDEFINE,
  MODEL_NAME_PRIORITY,
  MODEL_NAME_ROLE,
  MODEL_NAME_STATUS,
  MODEL_NAME_SERVICEGROUP,
  MODEL_NAME_SERVICE,
  MODEL_NAME_SERVICEREQUEST,
  MODEL_NAME_SERVICETYPE,
  MODEL_NAME_ZONE,
  // collections
  COLLECTION_NAME_ACCOUNT,
  COLLECTION_NAME_ALERT,
  COLLECTION_NAME_CONTENT,
  COLLECTION_NAME_CHANGELOG,
  COLLECTION_NAME_ITEM,
  COLLECTION_NAME_JURISDICTION,
  COLLECTION_NAME_PARTY,
  COLLECTION_NAME_PERMISSION,
  COLLECTION_NAME_PREDEFINE,
  COLLECTION_NAME_PRIORITY,
  COLLECTION_NAME_ROLE,
  COLLECTION_NAME_STATUS,
  COLLECTION_NAME_SERVICEGROUP,
  COLLECTION_NAME_SERVICE,
  COLLECTION_NAME_SERVICEREQUEST,
  COLLECTION_NAME_SERVICETYPE,
  COLLECTION_NAME_ZONE,
  // paths
  PATH_NAME_ACCOUNT,
  PATH_NAME_CONTENT,
  PATH_NAME_ITEM,
  PATH_NAME_JURISDICTION,
  PATH_NAME_PARTY,
  PATH_NAME_PERMISSION,
  PATH_NAME_PRIORITY,
  PATH_NAME_ROLE,
  PATH_NAME_STATUS,
  PATH_NAME_SERVICEGROUP,
  PATH_NAME_SERVICE,
  PATH_NAME_SERVICEREQUEST,
  PATH_NAME_SERVICETYPE,
  PATH_NAME_ZONE,
  // populations
  POPULATION_MAX_DEPTH,
  POPULATION_DEFAULT,
  // visibilities
  VISIBILITY_PRIVATE,
  VISIBILITY_PUBLIC,
  VISIBILITIES,
  // counters
  COUNTER_YEAR_FORMAT,
  COUNTER_PREFIX,
  COUNTER_PAD_SIZE,
  // contact methods
  CONTACT_METHOD_PHONE_CALL,
  CONTACT_METHOD_EMAIL,
  CONTACT_METHOD_SMS,
  CONTACT_METHOD_USSD,
  CONTACT_METHOD_VISIT,
  CONTACT_METHOD_LETTER,
  CONTACT_METHOD_FAX,
  CONTACT_METHOD_MOBILE_APP,
  CONTACT_METHOD_WEBSITE,
  CONTACT_METHODS,
  CONTACT_METHODS_WEB,
  // utilities
  unlocalize,
  checkDependenciesFor,
} from '../src';

describe('unit', () => {
  it('should expose models name', () => {
    expect(MODEL_NAME_ACCOUNT).to.be.equal('Account');
    expect(MODEL_NAME_ALERT).to.be.equal('Alert');
    expect(MODEL_NAME_CONTENT).to.be.equal('Content');
    expect(MODEL_NAME_CHANGELOG).to.be.equal('ChangeLog');
    expect(MODEL_NAME_ITEM).to.be.equal('Predefine');
    expect(MODEL_NAME_JURISDICTION).to.be.equal('Jurisdiction');
    expect(MODEL_NAME_PARTY).to.be.equal('Party');
    expect(MODEL_NAME_PERMISSION).to.be.equal('Permission');
    expect(MODEL_NAME_PREDEFINE).to.be.equal('Predefine');
    expect(MODEL_NAME_PRIORITY).to.be.equal('Priority');
    expect(MODEL_NAME_ROLE).to.be.equal('Role');
    expect(MODEL_NAME_STATUS).to.be.equal('Status');
    expect(MODEL_NAME_SERVICEGROUP).to.be.equal('ServiceGroup');
    expect(MODEL_NAME_SERVICE).to.be.equal('Service');
    expect(MODEL_NAME_SERVICEREQUEST).to.be.equal('ServiceRequest');
    expect(MODEL_NAME_SERVICETYPE).to.be.equal('Predefine');
    expect(MODEL_NAME_ZONE).to.be.equal('Predefine');
  });

  it('should expose collections name', () => {
    expect(COLLECTION_NAME_ALERT).to.be.equal('alerts');
    expect(COLLECTION_NAME_ACCOUNT).to.be.equal('accounts');
    expect(COLLECTION_NAME_CONTENT).to.be.equal('contents');
    expect(COLLECTION_NAME_CHANGELOG).to.be.equal('changelogs');
    expect(COLLECTION_NAME_ITEM).to.be.equal('predefines');
    expect(COLLECTION_NAME_JURISDICTION).to.be.equal('jurisdictions');
    expect(COLLECTION_NAME_PARTY).to.be.equal('parties');
    expect(COLLECTION_NAME_PERMISSION).to.be.equal('permissions');
    expect(COLLECTION_NAME_PREDEFINE).to.be.equal('predefines');
    expect(COLLECTION_NAME_PRIORITY).to.be.equal('priorities');
    expect(COLLECTION_NAME_ROLE).to.be.equal('roles');
    expect(COLLECTION_NAME_STATUS).to.be.equal('status');
    expect(COLLECTION_NAME_SERVICEGROUP).to.be.equal('servicegroups');
    expect(COLLECTION_NAME_SERVICE).to.be.equal('services');
    expect(COLLECTION_NAME_SERVICEREQUEST).to.be.equal('servicerequests');
    expect(COLLECTION_NAME_SERVICETYPE).to.be.equal('predefines');
    expect(COLLECTION_NAME_ZONE).to.be.equal('predefines');
  });

  it('should expose paths name', () => {
    expect(PATH_NAME_ACCOUNT).to.be.equal('account');
    expect(PATH_NAME_CONTENT).to.be.equal('content');
    expect(PATH_NAME_ITEM).to.be.equal('item');
    expect(PATH_NAME_JURISDICTION).to.be.equal('jurisdiction');
    expect(PATH_NAME_PARTY).to.be.equal('party');
    expect(PATH_NAME_PERMISSION).to.be.equal('permission');
    expect(PATH_NAME_PRIORITY).to.be.equal('priority');
    expect(PATH_NAME_ROLE).to.be.equal('role');
    expect(PATH_NAME_STATUS).to.be.equal('status');
    expect(PATH_NAME_SERVICEGROUP).to.be.equal('group');
    expect(PATH_NAME_SERVICE).to.be.equal('service');
    expect(PATH_NAME_SERVICEREQUEST).to.be.equal('request');
    expect(PATH_NAME_SERVICETYPE).to.be.equal('type');
    expect(PATH_NAME_ZONE).to.be.equal('zone');
  });

  it('should expose max auto populate depth', () => {
    expect(POPULATION_MAX_DEPTH).to.exist;
    expect(POPULATION_MAX_DEPTH).to.be.equal(1);
  });

  it('should expose default population', () => {
    expect(POPULATION_DEFAULT).to.exist;
    expect(POPULATION_DEFAULT).to.be.an('object');
    expect(POPULATION_DEFAULT).to.be.eql({ maxDepth: 1 });
  });

  it('should expose visibilities', () => {
    expect(VISIBILITY_PRIVATE).to.exist.and.be.equal('Private');
    expect(VISIBILITY_PUBLIC).to.exist.and.be.equal('Public');
    expect(VISIBILITIES).to.exist.and.be.eql([
      VISIBILITY_PRIVATE,
      VISIBILITY_PUBLIC,
    ]);
  });

  it('should expose counters', () => {
    expect(COUNTER_PREFIX).to.exist.and.be.equal('');
    expect(COUNTER_PAD_SIZE).to.exist.and.be.equal(4);
    expect(COUNTER_YEAR_FORMAT).to.exist.and.be.equal('YY');
  });

  it('shoudl expose contact methods', () => {
    expect(CONTACT_METHOD_PHONE_CALL).to.exist.and.be.equal('Call');
    expect(CONTACT_METHOD_EMAIL).to.exist.and.be.equal('Email');
    expect(CONTACT_METHOD_SMS).to.exist.and.be.equal('SMS');
    expect(CONTACT_METHOD_USSD).to.exist.and.be.equal('USSD');
    expect(CONTACT_METHOD_VISIT).to.exist.and.be.equal('Visit');
    expect(CONTACT_METHOD_LETTER).to.exist.and.be.equal('Letter');
    expect(CONTACT_METHOD_FAX).to.exist.and.be.equal('Fax');
    expect(CONTACT_METHOD_MOBILE_APP).to.exist.and.be.equal('Mobile');
    expect(CONTACT_METHOD_WEBSITE).to.exist.and.be.equal('Website');
    expect(CONTACT_METHODS).to.exist.and.be.eql([
      CONTACT_METHOD_PHONE_CALL,
      CONTACT_METHOD_EMAIL,
      CONTACT_METHOD_SMS,
      CONTACT_METHOD_USSD,
      CONTACT_METHOD_VISIT,
      CONTACT_METHOD_LETTER,
      CONTACT_METHOD_FAX,
      CONTACT_METHOD_MOBILE_APP,
      CONTACT_METHOD_WEBSITE,
    ]);
    expect(CONTACT_METHODS_WEB).to.exist.and.be.eql([
      CONTACT_METHOD_PHONE_CALL,
      CONTACT_METHOD_EMAIL,
      CONTACT_METHOD_SMS,
      CONTACT_METHOD_VISIT,
      CONTACT_METHOD_LETTER,
      CONTACT_METHOD_FAX,
    ]);
  });

  it('should unlocalize localize schema path', () => {
    const object = { en: 'Hello', sw: 'Mambo' };
    const unlocalized = unlocalize('greeting', object);
    expect(unlocalized).to.exist;
    expect(unlocalized).to.have.property('greeting');
    expect(unlocalized).to.have.property('greeting_en');
    expect(unlocalized).to.have.property('greeting_sw');
  });

  it('should check dependency for non-model', done => {
    checkDependenciesFor({}, {}, error => {
      expect(error).to.not.exist;
      done(error);
    });
  });
});
