'use strict';


/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');


/* chema options */
const SCHEMA_OPTIONS = {};
SCHEMA_OPTIONS.POPULATION_MAX_DEPTH = 1;
SCHEMA_OPTIONS.SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true
});
SCHEMA_OPTIONS.SUB_DOC_SCHEMA_OPTIONS = ({
  _id: false,
  id: false,
  timestamps: false,
  emitIndexErrors: true
});
SCHEMA_OPTIONS.DEFAULT_POPULATION = ({
  maxDepth: SCHEMA_OPTIONS.POPULATION_MAX_DEPTH
});


/* assign default schema options */
_.forEach(SCHEMA_OPTIONS, function (value, key) {
  // ensure key not exists
  if (!_.has(exports, key)) {
    // define getter
    Object.defineProperties(exports, {
      [key]: {
        get: function () {
          return value;
        }
      }
    });
  }
});


/**
 * @name unlocalize
 * @description flat a given localize schema path value
 * to unlocalized object
 *
 * @param {string} path prefix to used on unlocalized key
 * @param {object} data object to unlocalized
 * @return {object}
 *
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
exports.unlocalize = function unlocalize(path, data) {

  // prepare unlocalized data
  let unlocalized = {};

  //prepare localized
  let localized =
    (data && _.isFunction(data.toObject) ? data.toObject() : data);
  localized = _.merge({}, localized);

  _.forEach(localized, function (value, locale) {

    //handle default locale
    const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
    if (locale === DEFAULT_LOCALE) {
      unlocalized[path] = value;
    }

    //handle other locales
    else {
      const key = `${path}_${locale}`;
      unlocalized[key] = value;
    }

  });

  //return unlocalized object
  return _.omitBy(unlocalized, _.isUndefined);

};
