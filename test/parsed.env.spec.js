'use strict';

process.env.API_VERSION = '1.0.0';
process.env.DEFAULT_LOCALE = 'en';

describe('parsed', function () {

    describe('env', function () {
        expect(env.API_VERSION).to.exist;
        expect(env.DEFAULT_LANGUAGE).to.exist;
    });

});


