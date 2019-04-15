'use strict';


/* dependencies */
const path = require('path');


/* declarations */
const schema = require(path.join(__dirname, 'lib', 'schema'));
const models = require(path.join(__dirname, 'lib', 'models'));
const phone = require(path.join(__dirname, 'lib', 'phone'));


Object.defineProperties(exports, {
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
