import { expect } from '@lykmapipo/test-helpers';
import {
  // models
  MODEL_NAME_ACCOUNT,
  MODEL_NAME_CONTENT,
  MODEL_NAME_CHANGELOG,
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
  // collections
  COLLECTION_NAME_ACCOUNT,
  COLLECTION_NAME_CONTENT,
  COLLECTION_NAME_CHANGELOG,
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
} from '../src';

describe('majifix common', () => {
  it('should expose models name', () => {
    expect(MODEL_NAME_ACCOUNT).to.be.equal('Account');
    expect(MODEL_NAME_CONTENT).to.be.equal('Content');
    expect(MODEL_NAME_CHANGELOG).to.be.equal('Changelog');
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
  });

  it('should expose collections name', () => {
    expect(COLLECTION_NAME_ACCOUNT).to.be.equal('accounts');
    expect(COLLECTION_NAME_CONTENT).to.be.equal('contents');
    expect(COLLECTION_NAME_CHANGELOG).to.be.equal('changelogs');
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
  });
});
