import { toCollectionName } from '@lykmapipo/mongoose-common';

/* models name */
export const MODEL_NAME_ACCOUNT = 'Account';
export const MODEL_NAME_CONTENT = 'Content';
export const MODEL_NAME_CHANGELOG = 'Changelog';
export const MODEL_NAME_JURISDICTION = 'Jurisdiction';
export const MODEL_NAME_PARTY = 'Party';
export const MODEL_NAME_PERMISSION = 'Permission';
export const MODEL_NAME_PREDEFINE = 'Predefine';
export const MODEL_NAME_PRIORITY = 'Priority';
export const MODEL_NAME_ROLE = 'Role';
export const MODEL_NAME_STATUS = 'Status';
export const MODEL_NAME_SERVICEGROUP = 'ServiceGroup';
export const MODEL_NAME_SERVICE = 'Service';
export const MODEL_NAME_SERVICEREQUEST = 'ServiceRequest';
export const MODEL_NAME_SERVICETYPE = 'Predefine';

/* collections name */
export const COLLECTION_NAME_ACCOUNT = toCollectionName(MODEL_NAME_ACCOUNT);
export const COLLECTION_NAME_CONTENT = toCollectionName(MODEL_NAME_CONTENT);
export const COLLECTION_NAME_CHANGELOG = toCollectionName(MODEL_NAME_CHANGELOG);
export const COLLECTION_NAME_JURISDICTION = toCollectionName(
  MODEL_NAME_JURISDICTION
);
export const COLLECTION_NAME_PARTY = toCollectionName(MODEL_NAME_PARTY);
export const COLLECTION_NAME_PERMISSION = toCollectionName(
  MODEL_NAME_PERMISSION
);
export const COLLECTION_NAME_PREDEFINE = toCollectionName(MODEL_NAME_PREDEFINE);
export const COLLECTION_NAME_PRIORITY = toCollectionName(MODEL_NAME_PRIORITY);
export const COLLECTION_NAME_ROLE = toCollectionName(MODEL_NAME_ROLE);
export const COLLECTION_NAME_STATUS = toCollectionName(MODEL_NAME_STATUS);
export const COLLECTION_NAME_SERVICEGROUP = toCollectionName(
  MODEL_NAME_SERVICEGROUP
);
export const COLLECTION_NAME_SERVICE = toCollectionName(MODEL_NAME_SERVICE);
export const COLLECTION_NAME_SERVICEREQUEST = toCollectionName(
  MODEL_NAME_SERVICEREQUEST
);
export const COLLECTION_NAME_SERVICETYPE = toCollectionName(
  MODEL_NAME_SERVICETYPE
);

/* population options */
export const POPULATION_MAX_DEPTH = 1;

/* pedefines namespaces */

// TODO use models name
export const PREDEFINE_NAMESPACE_PRIORITY = 'Priority';
export const PREDEFINE_NAMESPACE_STATUS = 'Status';
export const PREDEFINE_NAMESPACE_SERVICEGROUP = 'ServiceGroup';
export const PREDEFINE_NAMESPACE_SERVICETYPE = 'ServiceType';
export const PREDEFINE_NAMESPACE_SERVICE = 'Service';
export const PREDEFINE_NAMESPACE_BLOCKREASON = 'BlockReason';

/* pedefines buckets */

// TODO use collections name
export const PREDEFINE_BUCKET_PRIORITY = 'priorities';
export const PREDEFINE_BUCKET_STATUS = 'status';
export const PREDEFINE_BUCKET_SERVICEGROUP = 'servicegroups';
export const PREDEFINE_BUCKET_SERVICETYPE = 'servicetypes';
export const PREDEFINE_BUCKET_SERVICE = 'services';
export const PREDEFINE_BUCKET_BLOCKREASON = 'blockreasons';
