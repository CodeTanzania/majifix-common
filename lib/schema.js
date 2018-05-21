'use strict';

/* dependencies */


/**
 * @example
 * const {POPULATION_MAX_DEPTH} = require('majifix-common').schema;
 */
Object.defineProperties(exports, {
  POPULATION_MAX_DEPTH: {
    get: function () {
      return 1;
    }
  },
  SUB_DOC_SCHEMA_OPTIONS: {
    get: function () {
      return ({ _id: false, id: false, timestamps: false, emitIndexErrors: true });
    }
  },
  DEFAULT_POPULATION: {
    get: function () {
      return ({ maxDepth: exports.POPULATION_MAX_DEPTH });
    }
  }
});


