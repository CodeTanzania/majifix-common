'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');


/* declarations */
const { DEFAULT_LOCALE } = require(path.join(__dirname, 'env'));


/**
 * @example
 * const {POPULATION_MAX_DEPTH} = require('majifix-common').schema;
 */
Object.defineProperties(exports, {
  POPULATION_MAX_DEPTH: {
    get: function () {
      return 1;
    }
  },
  SCHEMA_OPTIONS: {
    get: function () {
      return ({ timestamps: true, emitIndexErrors: true });
    }
  },
  SUB_DOC_SCHEMA_OPTIONS: {
    get: function () {
      return ({ _id: false, id: false, timestamps: false, emitIndexErrors: true });
    }
  },
  DEFAULT_POPULATION: {
    get: function () {
      return ({ maxDepth: exports.POPULATION_MAX_DEPTH });
    }
  }
});


/* helpers */

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
