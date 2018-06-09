'use strict';

/* dependencies */
const _ = require('lodash');

//country data

/**
 * @example
 * const { env } = require('@codetanzania/majifix-common');
 * const { LOCALES } = env;
 */
Object.defineProperties(exports, {
  LOCALES: {
    get: function () {
      let locales = _.get(process, 'env.LOCALES', '').split(',');
      locales = ([].concat(exports.DEFAULT_LOCALE).concat(locales));
      locales = _.compact(locales);
      locales = _.uniq(locales);
      return locales;
    }
  },
  API_VERSION: {
    get: function () {
      return process.env.API_VERSION || '1.0.0';
    }
  },
  DEFAULT_LOCALE: {
    get: function () {
      return process.env.DEFAULT_LOCALE || 'en';
    }
  },
  DEFAULT_COUNTRY_CODE: {
    get: function () {
      return process.env.DEFAULT_COUNTRY_CODE || 'TZ';
    }
  },
  DEFAULT_CALLING_CODE: {
    get: function () {
      return process.env.DEFAULT_CALLING_CODE || '255';
    }
  },
  DEFAULT_CONTENT_TYPE: {
    get: function () {
      return process.env.DEFAULT_CONTENT_TYPE || 'Post';
    }
  },
  CONTENT_TYPES: {
    get: function () {
      let contents =
        _.get(process, 'env.CONTENT_TYPES', '').split(',');
      contents =
        ([].concat(exports.DEFAULT_CONTENT_TYPE).concat(contents));
      contents = _.compact(contents);
      contents = _.uniq(contents);
      return contents;
    }
  },
});
