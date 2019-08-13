import { expect } from '@lykmapipo/test-helpers';
import {
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
} from '../src';

describe('common', () => {
  it('should expose model names', () => {
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
  });
});
