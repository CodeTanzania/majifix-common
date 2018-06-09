'use strict';


/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { expect } = require('chai');


/* declaration */
const models = require(path.join(__dirname, '..', 'lib', 'models'));
const common = require(path.join(__dirname, '..'));

describe('default', function () {

  describe('models', function () {

    it('should expose jurisdiction model name', function () {
      expect(models.JURISDICTION_MODEL_NAME).to.exist;
      expect(models.JURISDICTION_MODEL_NAME)
        .to.be.equal('Jurisdiction');
    });

    it('should expose status model name', function () {
      expect(models.STATUS_MODEL_NAME).to.exist;
      expect(models.STATUS_MODEL_NAME)
        .to.be.equal('Status');
    });

    it('should expose priority model name', function () {
      expect(models.PRIORITY_MODEL_NAME).to.exist;
      expect(models.PRIORITY_MODEL_NAME)
        .to.be.equal('Priority');
    });

    it('should expose service group model name', function () {
      expect(models.SERVICEGROUP_MODEL_NAME).to.exist;
      expect(models.SERVICEGROUP_MODEL_NAME)
        .to.be.equal('ServiceGroup');
    });

    it('should expose service model name', function () {
      expect(models.SERVICE_MODEL_NAME).to.exist;
      expect(models.SERVICE_MODEL_NAME)
        .to.be.equal('Service');
    });

    it('should expose service request model name', function () {
      expect(models.SERVICEREQUEST_MODEL_NAME).to.exist;
      expect(models.SERVICEREQUEST_MODEL_NAME)
        .to.be.equal('ServiceRequest');
    });

    it('should expose account model name', function () {
      expect(models.ACCOUNT_MODEL_NAME).to.exist;
      expect(models.ACCOUNT_MODEL_NAME)
        .to.be.equal('Account');
    });

    it('should expose content model name', function () {
      expect(models.CONTENT_MODEL_NAME).to.exist;
      expect(models.CONTENT_MODEL_NAME)
        .to.be.equal('Content');
    });

    it('should be exported', function () {
      expect(common).to.exist;
      expect(common.models).to.exist;
      expect(common.models).to.be.eql(models);
    });

    it('should get model', function () {
      expect(models.getModel).to.exist;
      expect(models.getModel).to.be.a('function');
    });

    it('should get model', function () {
      const Any = models.getModel('Any');
      expect(Any).to.be.undefined;
    });

    it('should get model', function () {
      mongoose.model('Any', new Schema({ name: String }));
      const Any = models.getModel('Any');
      expect(Any).to.exist;
    });


  });

});
