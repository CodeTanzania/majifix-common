import { expect } from 'chai';
import common from '../src';
import models from '../src/models';

describe('default', () => {
  describe('models', () => {
    it('should expose account model name', () => {
      expect(models.ACCOUNT_MODEL_NAME).to.exist;
      expect(models.ACCOUNT_MODEL_NAME).to.be.equal('Account');
    });

    it('should expose content model name', () => {
      expect(models.CONTENT_MODEL_NAME).to.exist;
      expect(models.CONTENT_MODEL_NAME).to.be.equal('Content');
    });

    it('should expose jurisdiction model name', () => {
      expect(models.JURISDICTION_MODEL_NAME).to.exist;
      expect(models.JURISDICTION_MODEL_NAME).to.be.equal('Jurisdiction');
    });

    it('should expose party model name', () => {
      expect(models.PARTY_MODEL_NAME).to.exist;
      expect(models.PARTY_MODEL_NAME).to.be.equal('Party');
    });

    it('should expose permission model name', () => {
      expect(models.PERMISSION_MODEL_NAME).to.exist;
      expect(models.PERMISSION_MODEL_NAME).to.be.equal('Permission');
    });

    it('should expose priority model name', () => {
      expect(models.PRIORITY_MODEL_NAME).to.exist;
      expect(models.PRIORITY_MODEL_NAME).to.be.equal('Priority');
    });

    it('should expose role model name', () => {
      expect(models.ROLE_MODEL_NAME).to.exist;
      expect(models.ROLE_MODEL_NAME).to.be.equal('Role');
    });

    it('should expose status model name', () => {
      expect(models.STATUS_MODEL_NAME).to.exist;
      expect(models.STATUS_MODEL_NAME).to.be.equal('Status');
    });

    it('should expose service group model name', () => {
      expect(models.SERVICEGROUP_MODEL_NAME).to.exist;
      expect(models.SERVICEGROUP_MODEL_NAME).to.be.equal('ServiceGroup');
    });

    it('should expose service model name', () => {
      expect(models.SERVICE_MODEL_NAME).to.exist;
      expect(models.SERVICE_MODEL_NAME).to.be.equal('Service');
    });

    it('should expose service request model name', () => {
      expect(models.SERVICEREQUEST_MODEL_NAME).to.exist;
      expect(models.SERVICEREQUEST_MODEL_NAME).to.be.equal('ServiceRequest');
    });

    it('should be exported', () => {
      expect(common).to.exist;
      expect(common.models).to.exist;
      expect(common.models).to.be.eql(models);
    });
  });
});
