'use strict';

describe('default', function () {

    describe('env', function () {
        expect(env.API_VERSION).to.exist;
        expect(env.DEFAULT_LANGUAGE).to.exist;
    });

});


