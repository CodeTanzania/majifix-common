'use strict';

/* dependencies */
const _ = require('lodash');

//country data

/**
 * @example
 * const { LOCALES } = require('majifix-common').env;
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
  DEFAULT_CALLING_CODE: {
    get: function () {
      return process.env.DEFAULT_CALLING_CODE || '255';
    }
  }
});
