'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declaration */
const schema = require(path.join(__dirname, '..', 'lib', 'schema'));

describe('default', () => {

  describe('schema', () => {

    it('should expose max auto populate depth', () => {
      expect(schema.POPULATION_MAX_DEPTH).to.exist;
      expect(schema.POPULATION_MAX_DEPTH).to.be.equal(1);
    });

    it('should expose schema options', () => {
      expect(schema.SCHEMA_OPTIONS).to.exist;
      expect(schema.SCHEMA_OPTIONS).to.be.an('object');
      expect(schema.SCHEMA_OPTIONS).to.be.eql({
        timestamps: true,
        emitIndexErrors: true
      });
    });

    it('should expose sub doc schema options', () => {
      expect(schema.SUB_DOC_SCHEMA_OPTIONS).to.exist;
      expect(schema.SUB_DOC_SCHEMA_OPTIONS).to.be.an('object');
      expect(schema.SUB_DOC_SCHEMA_OPTIONS).to.be.eql({
        _id: false,
        id: false,
        timestamps: false,
        emitIndexErrors: true
      });
    });

    it('should expose default population', () => {
      expect(schema.DEFAULT_POPULATION).to.exist;
      expect(schema.DEFAULT_POPULATION).to.be.an('object');
      expect(schema.DEFAULT_POPULATION).to.be.eql({ maxDepth: 1 });
    });

    it('should be able to unlocalize', () => {
      const object = { en: 'Hello', sw: 'Mambo' };
      const unlocalized = schema.unlocalize('greeting', object);
      expect(unlocalized).to.exist;
      expect(unlocalized).to.have.property('greeting');
      expect(unlocalized).to.have.property('greeting_sw');
    });

  });

});
