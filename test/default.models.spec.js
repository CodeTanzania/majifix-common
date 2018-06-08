'use strict';


/* dependencies */
const path = require('path');
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

    it('should be exported', function () {
      expect(common).to.exist;
      expect(common.models).to.exist;
      expect(common.models).to.be.eql(models);
    });

  });

});
