'use strict';


/* dependencies */
const env = require('@lykmapipo/env');


/* constants */
/* deprecated */
Object.defineProperties(env, {
  DEFAULT_LOCALE: {
    get: function () {
      return process.env.DEFAULT_LOCALE || 'en';
    }
  },
  LOCALES: {
    get: function () {
      let locales =
        env.getArray('LOCALES', env.DEFAULT_LOCALE);
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
        env.getArray('CONTENT_TYPES', env.DEFAULT_CONTENT_TYPE);
      return contents;
    }
  },
});


/* exports env */
module.exports = exports = env;
