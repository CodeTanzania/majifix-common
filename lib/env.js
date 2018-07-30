'use strict';

/* dependencies */
const _ = require('lodash');

//country data

/* constants */
Object.defineProperties(exports, {
  DEFAULT_LOCALE: {
    get: function () {
      return process.env.DEFAULT_LOCALE || 'en';
    }
  },
  LOCALES: {
    get: function () {
      let locales =
        exports.getArray('LOCALES', exports.DEFAULT_LOCALE);
      return locales;
    }
  },
  API_VERSION: {
    get: function () {
      return process.env.API_VERSION || '1.0.0';
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
        exports.getArray('CONTENT_TYPES', exports.DEFAULT_CONTENT_TYPE);
      return contents;
    }
  },
});


/* helpers */
exports.getArray = function getArray(key, defaultValue) {
  let value = [].concat(defaultValue);
  if (!_.isEmpty(key)) {
    value =
      ([].concat(value).concat(_.get(process, `env.${key}`, '').split(',')));
  }
  return _.uniq(_.compact(value));
};
