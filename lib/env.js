'use strict';


/* dependencies */
const _ = require('lodash');
const env = require('@lykmapipo/env');
const {
  getArray
} = env;


/* defaults */
const DEFAULTS = {};
DEFAULTS.DEFAULT_LOCALE = 'en';
DEFAULTS.LOCALES = [].concat(DEFAULTS.DEFAULT_LOCALE);
DEFAULTS.API_VERSION = '1.0.0';
DEFAULTS.DEFAULT_COUNTRY_CODE = 'TZ';
DEFAULTS.DEFAULT_COUNTRY_NAME = 'Tanzania';
DEFAULTS.DEFAULT_CALLING_CODE = '255';
DEFAULTS.DEFAULT_CONTENT_TYPE = 'Post';
DEFAULTS.CONTENT_TYPES = [].concat(DEFAULTS.DEFAULT_CONTENT_TYPE);


/* assign default env variables */
_.forEach(DEFAULTS, function(value, key) {
  // ensure key not exists
  if (!_.has(env, key)) {
    // define getter
    Object.defineProperties(env, {
      [key]: {
        get: function() {
          return _.isArray(value) ? getArray(key, value) : env(key, value);
        }
      }
    });
  }
});


/* exports env */
module.exports = exports = env;
