'use strict';


/* force environment to be test */
process.env.NODE_ENV = 'test';


/* setup */
require('chai').use(require('sinon-chai'));
require('sinon');
