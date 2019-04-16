'use strict';


/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { expect } = require('chai');


/* declaration */
const models = require(path.join(__dirname, '..', 'lib', 'models'));
const common = require(path.join(__dirname, '..'));

describe('default', () => {

  describe('models', () => {

    it('should expose account model name', () => {
      expect(models.ACCOUNT_MODEL_NAME).to.exist;
      expect(models.ACCOUNT_MODEL_NAME)
        .to.be.equal('Account');
    });

    it('should expose content model name', () => {
      expect(models.CONTENT_MODEL_NAME).to.exist;
      expect(models.CONTENT_MODEL_NAME)
        .to.be.equal('Content');
    });

    it('should expose jurisdiction model name', () => {
      expect(models.JURISDICTION_MODEL_NAME).to.exist;
      expect(models.JURISDICTION_MODEL_NAME)
        .to.be.equal('Jurisdiction');
    });

    it('should expose party model name', () => {
      expect(models.PARTY_MODEL_NAME).to.exist;
      expect(models.PARTY_MODEL_NAME)
        .to.be.equal('Party');
    });

    it('should expose permission model name', () => {
      expect(models.PERMISSION_MODEL_NAME).to.exist;
      expect(models.PERMISSION_MODEL_NAME)
        .to.be.equal('Permission');
    });

    it('should expose priority model name', () => {
      expect(models.PRIORITY_MODEL_NAME).to.exist;
      expect(models.PRIORITY_MODEL_NAME)
        .to.be.equal('Priority');
    });

    it('should expose role model name', () => {
      expect(models.ROLE_MODEL_NAME).to.exist;
      expect(models.ROLE_MODEL_NAME)
        .to.be.equal('Role');
    });

    it('should expose status model name', () => {
      expect(models.STATUS_MODEL_NAME).to.exist;
      expect(models.STATUS_MODEL_NAME)
        .to.be.equal('Status');
    });

    it('should expose service group model name', () => {
      expect(models.SERVICEGROUP_MODEL_NAME).to.exist;
      expect(models.SERVICEGROUP_MODEL_NAME)
        .to.be.equal('ServiceGroup');
    });

    it('should expose service model name', () => {
      expect(models.SERVICE_MODEL_NAME).to.exist;
      expect(models.SERVICE_MODEL_NAME)
        .to.be.equal('Service');
    });

    it('should expose service request model name', () => {
      expect(models.SERVICEREQUEST_MODEL_NAME).to.exist;
      expect(models.SERVICEREQUEST_MODEL_NAME)
        .to.be.equal('ServiceRequest');
    });

    it('should be exported', () => {
      expect(common).to.exist;
      expect(common.models).to.exist;
      expect(common.models).to.be.eql(models);
    });

    it('should get model', () => {
      expect(models.getModel).to.exist;
      expect(models.getModel).to.be.a('function');
    });

    it('should get model', () => {
      const Any = models.getModel('Any');
      expect(Any).to.be.undefined;
    });

    it('should get model', () => {
      mongoose.model('Any', new Schema({ name: String }));
      const Any = models.getModel('Any');
      expect(Any).to.exist;
    });


  });

});
