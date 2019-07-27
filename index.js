'use strict';

/* dependencies */
const path = require('path');

/* declarations */
const schema = require(path.join(__dirname, 'lib', 'schema'));
const models = require(path.join(__dirname, 'lib', 'models'));
const phone = require(path.join(__dirname, 'lib', 'phone'));

Object.defineProperties(exports, {
  schema: {
    get: function() {
      return schema;
    },
  },
  models: {
    get: function() {
      return models;
    },
  },
  phone: {
    get: function() {
      return phone;
    },
  },
});

/* pedefines namespaces */
exports.PREDEFINE_NAMESPACE_PRIORITY = 'Priority';
exports.PREDEFINE_NAMESPACE_STATUS = 'Status';
exports.PREDEFINE_NAMESPACE_SERVICEGROUP = 'ServiceGroup';
exports.PREDEFINE_NAMESPACE_SERVICETYPE = 'ServiceType';
exports.PREDEFINE_NAMESPACE_SERVICE = 'Service';
exports.PREDEFINE_NAMESPACE_BLOCKREASON = 'BlockReason';

/* pedefines buckets */
exports.PREDEFINE_BUCKET_PRIORITY = 'priorities';
exports.PREDEFINE_BUCKET_STATUS = 'statuses';
exports.PREDEFINE_BUCKET_SERVICEGROUP = 'servicegroups';
exports.PREDEFINE_BUCKET_SERVICETYPE = 'servicetypes';
exports.PREDEFINE_BUCKET_SERVICE = 'services';
exports.PREDEFINE_BUCKET_BLOCKREASON = 'blockreasons';
