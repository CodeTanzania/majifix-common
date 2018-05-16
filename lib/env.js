'use strict';

/* dependencies */
const _ = require('lodash');

exports.API_VERSION = process.env.API_VERSION || '1.0.0';
exports.DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'en';

//country data

/**
 * @example
 * const { LOCALES } = require('majifix-common').env;
 */
Object.defineProperty(exports, 'LOCALES', {
    get: function () {
        let locales = _.get(process, 'env.LOCALES', '').split(',');
        locales = ([].concat(exports.DEFAULT_LOCALE).concat(locales));
        locales = _.compact(locales);
        locales = _.uniq(locales);
        return locales;
    }
});