'use strict';


/* dependencies */
const path = require('path');


/* declarations */
const env = require(path.join(__dirname, 'lib', 'env'));
const schema = require(path.join(__dirname, 'lib', 'schema'));
const models = require(path.join(__dirname, 'lib', 'models'));
const phone = require(path.join(__dirname, 'lib', 'phone'));


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
  },
  phone: {
    get: function () {
      return phone;
    }
  }
});
