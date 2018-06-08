'use strict';


/* dependencies */
const path = require('path');


/* declarations */
const env = require(path.join(__dirname, 'lib', 'env'));
const schema = require(path.join(__dirname, 'lib', 'schema'));
const models = require(path.join(__dirname, 'lib', 'models'));


Object.defineProperties(exports, {
  env: {
    get: function () {
      return env;
    }
  },
  schema: {
    get: function () {
      return schema;
    }
  },
  models: {
    get: function () {
      return models;
    }
  }
});
