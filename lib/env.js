'use strict';

/* dependencies */
const _ = require('lodash');

//TODO country data
//TODO expose all env merge default & freeze export

/* definition */
function env(key, defaultValue) {
  const value = process.env[key] || defaultValue;
  return value;
}


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


/* helpers */
env.getArray = function getArray(key, defaultValue) {
  let value = [].concat(defaultValue);
  if (!_.isEmpty(key)) {
    value =
      ([].concat(value).concat(_.get(process.env, key, '').split(',')));
  }
  value = _.map(value, _.trim);
  return _.uniq(_.compact(value));
};

env.getNumbers = function getNumbers(key, defaultValue) {
  let numbers = env.getArray(key, defaultValue);
  numbers = _.map(numbers, function (number) { return Number(number); });
  return numbers;
};

env.getNumber = function getNumber(key, defaultValue) {
  let value = env(key, defaultValue);
  value = value ? Number(value) : value;
  return value;
};

env.getString = function getString(key, defaultValue) {
  let value = env(key, defaultValue);
  value = value ? String(value) : value;
  return value;
};

env.getStrings = function getStrings(key, defaultValue) {
  let strings = env.getArray(key, defaultValue);
  strings = _.map(strings, function (number) { return String(number); });
  return strings;
};


/* exports env */
module.exports = exports = env;
