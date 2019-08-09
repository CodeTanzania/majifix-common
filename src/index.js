import schema from './schema';
import models from './models';

Object.defineProperties(exports, {
  schema: {
    get() {
      return schema;
    },
  },
  models: {
    get() {
      return models;
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
