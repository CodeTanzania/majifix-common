import { expect } from '@lykmapipo/test-helpers';
import {
  // models
  MODEL_NAME_ACCOUNT,
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
  // utilities
  unlocalize,
  checkDependencyFor,
} from '../src';

describe('majifix common', () => {
  it('should expose models name', () => {
    expect(MODEL_NAME_ACCOUNT).to.be.equal('Account');
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

  it('should unlocalize localize schema path', () => {
    const object = { en: 'Hello', sw: 'Mambo' };
    const unlocalized = unlocalize('greeting', object);
    expect(unlocalized).to.exist;
    expect(unlocalized).to.have.property('greeting');
    expect(unlocalized).to.have.property('greeting_en');
    expect(unlocalized).to.have.property('greeting_sw');
  });

  it('should check dependency for non-model', done => {
    checkDependencyFor({}, {}, error => {
      expect(error).to.not.exist;
      done(error);
    });
  });
});
