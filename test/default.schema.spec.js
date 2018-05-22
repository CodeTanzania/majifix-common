'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declaration */
const schema = require(path.join(__dirname, '..', 'lib', 'schema'));

describe('default', function () {

  describe('schema', function () {

    it('should expose max auto populate depth', function () {
      expect(schema.POPULATION_MAX_DEPTH).to.exist;
      expect(schema.POPULATION_MAX_DEPTH).to.be.equal(1);
    });

    it('should expose sub doc schema options', function () {
      expect(schema.SUB_DOC_SCHEMA_OPTIONS).to.exist;
      expect(schema.SUB_DOC_SCHEMA_OPTIONS).to.be.an('object');
      expect(schema.SUB_DOC_SCHEMA_OPTIONS).to.be.eql({ _id: false, id: false, timestamps: false, emitIndexErrors: true });
    });

    it('should expose default population', function () {
      expect(schema.DEFAULT_POPULATION).to.exist;
      expect(schema.DEFAULT_POPULATION).to.be.an('object');
      expect(schema.DEFAULT_POPULATION).to.be.eql({ maxDepth: 1 });
    });
  });
});
