'use strict';

const lodash = require('lodash');
const async = require('async');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const mongooseCommon = require('@lykmapipo/mongoose-common');

//
// constants
//

/* models name */
const MODEL_NAME_ACCOUNT = 'Account';
const MODEL_NAME_ALERT = 'Alert';
const MODEL_NAME_CONTENT = 'Content';
const MODEL_NAME_CHANGELOG = 'ChangeLog';
const MODEL_NAME_ITEM = 'Predefine';
const MODEL_NAME_JURISDICTION = 'Jurisdiction';
const MODEL_NAME_PARTY = 'Party';
const MODEL_NAME_PERMISSION = 'Permission';
const MODEL_NAME_PREDEFINE = 'Predefine';
const MODEL_NAME_PRIORITY = 'Priority';
const MODEL_NAME_ROLE = 'Role';
const MODEL_NAME_STATUS = 'Status';
const MODEL_NAME_SERVICEGROUP = 'ServiceGroup';
const MODEL_NAME_SERVICE = 'Service';
const MODEL_NAME_SERVICEREQUEST = 'ServiceRequest';
const MODEL_NAME_SERVICETYPE = 'Predefine';
const MODEL_NAME_ZONE = 'Predefine';

/* collections name */
const COLLECTION_NAME_ACCOUNT = mongooseCommon.toCollectionName(MODEL_NAME_ACCOUNT);
const COLLECTION_NAME_ALERT = mongooseCommon.toCollectionName(MODEL_NAME_ALERT);
const COLLECTION_NAME_CONTENT = mongooseCommon.toCollectionName(MODEL_NAME_CONTENT);
const COLLECTION_NAME_CHANGELOG = mongooseCommon.toCollectionName(MODEL_NAME_CHANGELOG);
const COLLECTION_NAME_ITEM = mongooseCommon.toCollectionName(MODEL_NAME_ITEM);
const COLLECTION_NAME_JURISDICTION = mongooseCommon.toCollectionName(
  MODEL_NAME_JURISDICTION
);
const COLLECTION_NAME_PARTY = mongooseCommon.toCollectionName(MODEL_NAME_PARTY);
const COLLECTION_NAME_PERMISSION = mongooseCommon.toCollectionName(
  MODEL_NAME_PERMISSION
);
const COLLECTION_NAME_PREDEFINE = mongooseCommon.toCollectionName(MODEL_NAME_PREDEFINE);
const COLLECTION_NAME_PRIORITY = mongooseCommon.toCollectionName(MODEL_NAME_PRIORITY);
const COLLECTION_NAME_ROLE = mongooseCommon.toCollectionName(MODEL_NAME_ROLE);
const COLLECTION_NAME_STATUS = mongooseCommon.toCollectionName(MODEL_NAME_STATUS);
const COLLECTION_NAME_SERVICEGROUP = mongooseCommon.toCollectionName(
  MODEL_NAME_SERVICEGROUP
);
const COLLECTION_NAME_SERVICE = mongooseCommon.toCollectionName(MODEL_NAME_SERVICE);
const COLLECTION_NAME_SERVICEREQUEST = mongooseCommon.toCollectionName(
  MODEL_NAME_SERVICEREQUEST
);
const COLLECTION_NAME_SERVICETYPE = mongooseCommon.toCollectionName(
  MODEL_NAME_SERVICETYPE
);
const COLLECTION_NAME_ZONE = mongooseCommon.toCollectionName(MODEL_NAME_ZONE);

/* paths name */
const PATH_NAME_ACCOUNT = 'account';
const PATH_NAME_ASSIGNEE = 'assignee';
const PATH_NAME_CONTENT = 'content';
const PATH_NAME_ITEM = 'item';
const PATH_NAME_JURISDICTION = 'jurisdiction';
const PATH_NAME_OPERATOR = 'operator';
const PATH_NAME_PARTY = 'party';
const PATH_NAME_PERMISSION = 'permission';
const PATH_NAME_PRIORITY = 'priority';
const PATH_NAME_ROLE = 'role';
const PATH_NAME_STATUS = 'status';
const PATH_NAME_SERVICEGROUP = 'group';
const PATH_NAME_SERVICE = 'service';
const PATH_NAME_SERVICEREQUEST = 'request';
const PATH_NAME_SERVICETYPE = 'type';
const PATH_NAME_ZONE = 'zone';

/* population options */
const POPULATION_MAX_DEPTH = 1;
const POPULATION_DEFAULT = { maxDepth: POPULATION_MAX_DEPTH };

/* pedefines namespaces */

// TODO use models name
const PREDEFINE_NAMESPACE_PRIORITY = 'Priority';
const PREDEFINE_NAMESPACE_STATUS = 'Status';
const PREDEFINE_NAMESPACE_SERVICEGROUP = 'ServiceGroup';
const PREDEFINE_NAMESPACE_SERVICETYPE = 'ServiceType';
const PREDEFINE_NAMESPACE_SERVICE = 'Service';
const PREDEFINE_NAMESPACE_BLOCKREASON = 'BlockReason';

/* pedefines buckets */

// TODO use collections name
const PREDEFINE_BUCKET_PRIORITY = 'priorities';
const PREDEFINE_BUCKET_STATUS = 'status';
const PREDEFINE_BUCKET_SERVICEGROUP = 'servicegroups';
const PREDEFINE_BUCKET_SERVICETYPE = 'servicetypes';
const PREDEFINE_BUCKET_SERVICE = 'services';
const PREDEFINE_BUCKET_BLOCKREASON = 'blockreasons';

/* visibilities */
const VISIBILITY_PUBLIC = 'Public';
const VISIBILITY_PRIVATE = 'Private';
const VISIBILITIES = [VISIBILITY_PRIVATE, VISIBILITY_PUBLIC];

/* counters */
const COUNTER_YEAR_FORMAT = env.getString('COUNTER_YEAR_FORMAT', 'YY');
const COUNTER_PREFIX = env.getString('COUNTER_PREFIX', '');
const COUNTER_PAD_SIZE = env.getNumber('COUNTER_PAD_SIZE', 4);

/* contact methods */
const CONTACT_METHOD_PHONE_CALL = 'Call';
const CONTACT_METHOD_EMAIL = 'Email';
const CONTACT_METHOD_SMS = 'SMS';
const CONTACT_METHOD_USSD = 'USSD';
const CONTACT_METHOD_VISIT = 'Visit';
const CONTACT_METHOD_LETTER = 'Letter';
const CONTACT_METHOD_FAX = 'Fax';
const CONTACT_METHOD_MOBILE_APP = 'Mobile';
const CONTACT_METHOD_WEBSITE = 'Website';
const CONTACT_METHODS = [
  CONTACT_METHOD_PHONE_CALL,
  CONTACT_METHOD_EMAIL,
  CONTACT_METHOD_SMS,
  CONTACT_METHOD_USSD,
  CONTACT_METHOD_VISIT,
  CONTACT_METHOD_LETTER,
  CONTACT_METHOD_FAX,
  CONTACT_METHOD_MOBILE_APP,
  CONTACT_METHOD_WEBSITE,
];
const CONTACT_METHODS_WEB = [
  CONTACT_METHOD_PHONE_CALL,
  CONTACT_METHOD_EMAIL,
  CONTACT_METHOD_SMS,
  CONTACT_METHOD_VISIT,
  CONTACT_METHOD_LETTER,
  CONTACT_METHOD_FAX,
];

/* workspaces */
const WORKSPACE_CALL_CENTER = 'Call Center';
const WORKSPACE_CUSTOMER_CARE = 'Customer Care';
const WORKSPACE_TECHNICAL = 'Technical';
const WORKSPACE_OTHER = 'Other';
const WORKSPACES = [
  WORKSPACE_CALL_CENTER,
  WORKSPACE_CUSTOMER_CARE,
  WORKSPACE_TECHNICAL,
  WORKSPACE_OTHER,
];

/* party relation name */
const RELATION_NAME_INTERNAL = 'Internal';
const RELATION_NAME_CUSTOMER = 'Customer';
const RELATION_NAME_CIVILIAN = 'Civilian';
const RELATION_NAME_AGENCY = 'Agency';
const RELATION_NAME_APP = 'App';
const RELATION_NAMES = [
  RELATION_NAME_INTERNAL,
  RELATION_NAME_CUSTOMER,
  RELATION_NAME_CIVILIAN,
  RELATION_NAME_AGENCY,
  RELATION_NAME_APP,
];

/* party relation types */
const RELATION_TYPE_WORKER = 'Worker';
const RELATION_TYPE_INDIVIDUAL = 'Individual';
const RELATION_TYPE_ORGANIZATION = 'Organization';
const RELATION_TYPE_APP = 'App';
const RELATION_TYPES = [
  RELATION_TYPE_WORKER,
  RELATION_TYPE_INDIVIDUAL,
  RELATION_TYPE_ORGANIZATION,
  RELATION_TYPE_APP,
];

//
// utilities
//

/**
 * @function unlocalize
 * @name unlocalize
 * @description Flatten a given localize schema path value
 * to unlocalized object
 * @param {string} path prefix to used on unlocalized key
 * @param {object} data object to unlocalized
 * @returns {object} unlocalize schema paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const obj = mergeObjects('group',{ en: 'One', sw: 'Moja' });
 * // => { group_en: 'One', group_sw: 'Moja' };
 */
const unlocalize = (path, data) => {
  // prepare unlocalized data
  const unlocalized = {};

  // prepare localized
  const localized = mongooseCommon.copyInstance(data);

  // unlocalize each locale for a path
  lodash.forEach(localized, (value, locale) => {
    // handle default locale
    const DEFAULT_LOCALE = env.getString('DEFAULT_LOCALE', 'en');
    if (locale === DEFAULT_LOCALE) {
      unlocalized[path] = value;
    }

    // handle other locales
    const key = `${path}_${locale}`;
    unlocalized[key] = value;
  });

  // return unlocalized object
  return common.mergeObjects(unlocalized);
};

/**
 * @function checkDependenciesFor
 * @name checkDependenciesFor
 * @description Check if there are dependencies with instances already
 * saved before deleting the parent model
 * @param {object} parent valid mongoose model instance
 * @param {object} optns valid options
 * @param {string} optns.path parent path on dependant
 * @param {boolean} [optns.self=false] whether to perform self check for
 * existence, for hierarchical models
 * @param {string[]} optns.dependencies model name of the dependants
 * @param {Function} done a callback to invoke on success or failure
 * @returns {Function} dependencies cleaner
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const path = 'jurisdiction';
 * const dependencies = ['Service'];
 * checkDependenciesFor(instance, { path, dependencies }, done);
 */
const checkDependenciesFor = (parent, optns, done) => {
  // ensure options
  const options = common.mergeObjects(optns);

  // obtain path
  const { path, dependencies } = options;

  // ensure valid model instance for parent
  if (!mongooseCommon.isInstance(parent)) {
    return done();
  }

  // ensure parent path
  if (lodash.isEmpty(path)) {
    return done();
  }

  // ensure dependencies
  if (lodash.isEmpty(dependencies)) {
    return done();
  }

  // accumaltor for dependencies checker
  const dependants = {};

  // check for provided dependency
  const checkDependency = dependency => {
    const dependantKey = `check${dependency}Dependency`;
    const Dependant = mongooseCommon.model(dependency);
    const dependantLabel = lodash.join(lodash.split(lodash.snakeCase(dependency), '_'), ' ');
    const criteria = {
      [path]: common.idOf(parent),
    };

    // restrict per existing model
    // collect dependant cleaner
    if (Dependant && !lodash.isEmpty(criteria)) {
      dependants[dependantKey] = next => {
        Dependant.countDocuments(criteria, (error, count) => {
          let exception = error;

          // warn can not delete due to dependencies
          if (count && count > 0) {
            const errorMessage = `
            Fail to Delete. ${count} ${dependantLabel} depend on it
            `;
            exception = new Error(errorMessage);
          }

          // ensure error status
          if (exception && !exception.status) {
            exception.status = 400;
          }

          // return
          next(exception, parent);
        });
      };
    }
  };

  // check for each dependency
  lodash.forEach(dependencies, checkDependency);

  // check for all dependencies
  if (!lodash.isEmpty(dependants)) {
    return async.parallel(dependants, error => done(error, parent));
  }

  // continue
  return done();
};

exports.COLLECTION_NAME_ACCOUNT = COLLECTION_NAME_ACCOUNT;
exports.COLLECTION_NAME_ALERT = COLLECTION_NAME_ALERT;
exports.COLLECTION_NAME_CHANGELOG = COLLECTION_NAME_CHANGELOG;
exports.COLLECTION_NAME_CONTENT = COLLECTION_NAME_CONTENT;
exports.COLLECTION_NAME_ITEM = COLLECTION_NAME_ITEM;
exports.COLLECTION_NAME_JURISDICTION = COLLECTION_NAME_JURISDICTION;
exports.COLLECTION_NAME_PARTY = COLLECTION_NAME_PARTY;
exports.COLLECTION_NAME_PERMISSION = COLLECTION_NAME_PERMISSION;
exports.COLLECTION_NAME_PREDEFINE = COLLECTION_NAME_PREDEFINE;
exports.COLLECTION_NAME_PRIORITY = COLLECTION_NAME_PRIORITY;
exports.COLLECTION_NAME_ROLE = COLLECTION_NAME_ROLE;
exports.COLLECTION_NAME_SERVICE = COLLECTION_NAME_SERVICE;
exports.COLLECTION_NAME_SERVICEGROUP = COLLECTION_NAME_SERVICEGROUP;
exports.COLLECTION_NAME_SERVICEREQUEST = COLLECTION_NAME_SERVICEREQUEST;
exports.COLLECTION_NAME_SERVICETYPE = COLLECTION_NAME_SERVICETYPE;
exports.COLLECTION_NAME_STATUS = COLLECTION_NAME_STATUS;
exports.COLLECTION_NAME_ZONE = COLLECTION_NAME_ZONE;
exports.CONTACT_METHODS = CONTACT_METHODS;
exports.CONTACT_METHODS_WEB = CONTACT_METHODS_WEB;
exports.CONTACT_METHOD_EMAIL = CONTACT_METHOD_EMAIL;
exports.CONTACT_METHOD_FAX = CONTACT_METHOD_FAX;
exports.CONTACT_METHOD_LETTER = CONTACT_METHOD_LETTER;
exports.CONTACT_METHOD_MOBILE_APP = CONTACT_METHOD_MOBILE_APP;
exports.CONTACT_METHOD_PHONE_CALL = CONTACT_METHOD_PHONE_CALL;
exports.CONTACT_METHOD_SMS = CONTACT_METHOD_SMS;
exports.CONTACT_METHOD_USSD = CONTACT_METHOD_USSD;
exports.CONTACT_METHOD_VISIT = CONTACT_METHOD_VISIT;
exports.CONTACT_METHOD_WEBSITE = CONTACT_METHOD_WEBSITE;
exports.COUNTER_PAD_SIZE = COUNTER_PAD_SIZE;
exports.COUNTER_PREFIX = COUNTER_PREFIX;
exports.COUNTER_YEAR_FORMAT = COUNTER_YEAR_FORMAT;
exports.MODEL_NAME_ACCOUNT = MODEL_NAME_ACCOUNT;
exports.MODEL_NAME_ALERT = MODEL_NAME_ALERT;
exports.MODEL_NAME_CHANGELOG = MODEL_NAME_CHANGELOG;
exports.MODEL_NAME_CONTENT = MODEL_NAME_CONTENT;
exports.MODEL_NAME_ITEM = MODEL_NAME_ITEM;
exports.MODEL_NAME_JURISDICTION = MODEL_NAME_JURISDICTION;
exports.MODEL_NAME_PARTY = MODEL_NAME_PARTY;
exports.MODEL_NAME_PERMISSION = MODEL_NAME_PERMISSION;
exports.MODEL_NAME_PREDEFINE = MODEL_NAME_PREDEFINE;
exports.MODEL_NAME_PRIORITY = MODEL_NAME_PRIORITY;
exports.MODEL_NAME_ROLE = MODEL_NAME_ROLE;
exports.MODEL_NAME_SERVICE = MODEL_NAME_SERVICE;
exports.MODEL_NAME_SERVICEGROUP = MODEL_NAME_SERVICEGROUP;
exports.MODEL_NAME_SERVICEREQUEST = MODEL_NAME_SERVICEREQUEST;
exports.MODEL_NAME_SERVICETYPE = MODEL_NAME_SERVICETYPE;
exports.MODEL_NAME_STATUS = MODEL_NAME_STATUS;
exports.MODEL_NAME_ZONE = MODEL_NAME_ZONE;
exports.PATH_NAME_ACCOUNT = PATH_NAME_ACCOUNT;
exports.PATH_NAME_ASSIGNEE = PATH_NAME_ASSIGNEE;
exports.PATH_NAME_CONTENT = PATH_NAME_CONTENT;
exports.PATH_NAME_ITEM = PATH_NAME_ITEM;
exports.PATH_NAME_JURISDICTION = PATH_NAME_JURISDICTION;
exports.PATH_NAME_OPERATOR = PATH_NAME_OPERATOR;
exports.PATH_NAME_PARTY = PATH_NAME_PARTY;
exports.PATH_NAME_PERMISSION = PATH_NAME_PERMISSION;
exports.PATH_NAME_PRIORITY = PATH_NAME_PRIORITY;
exports.PATH_NAME_ROLE = PATH_NAME_ROLE;
exports.PATH_NAME_SERVICE = PATH_NAME_SERVICE;
exports.PATH_NAME_SERVICEGROUP = PATH_NAME_SERVICEGROUP;
exports.PATH_NAME_SERVICEREQUEST = PATH_NAME_SERVICEREQUEST;
exports.PATH_NAME_SERVICETYPE = PATH_NAME_SERVICETYPE;
exports.PATH_NAME_STATUS = PATH_NAME_STATUS;
exports.PATH_NAME_ZONE = PATH_NAME_ZONE;
exports.POPULATION_DEFAULT = POPULATION_DEFAULT;
exports.POPULATION_MAX_DEPTH = POPULATION_MAX_DEPTH;
exports.PREDEFINE_BUCKET_BLOCKREASON = PREDEFINE_BUCKET_BLOCKREASON;
exports.PREDEFINE_BUCKET_PRIORITY = PREDEFINE_BUCKET_PRIORITY;
exports.PREDEFINE_BUCKET_SERVICE = PREDEFINE_BUCKET_SERVICE;
exports.PREDEFINE_BUCKET_SERVICEGROUP = PREDEFINE_BUCKET_SERVICEGROUP;
exports.PREDEFINE_BUCKET_SERVICETYPE = PREDEFINE_BUCKET_SERVICETYPE;
exports.PREDEFINE_BUCKET_STATUS = PREDEFINE_BUCKET_STATUS;
exports.PREDEFINE_NAMESPACE_BLOCKREASON = PREDEFINE_NAMESPACE_BLOCKREASON;
exports.PREDEFINE_NAMESPACE_PRIORITY = PREDEFINE_NAMESPACE_PRIORITY;
exports.PREDEFINE_NAMESPACE_SERVICE = PREDEFINE_NAMESPACE_SERVICE;
exports.PREDEFINE_NAMESPACE_SERVICEGROUP = PREDEFINE_NAMESPACE_SERVICEGROUP;
exports.PREDEFINE_NAMESPACE_SERVICETYPE = PREDEFINE_NAMESPACE_SERVICETYPE;
exports.PREDEFINE_NAMESPACE_STATUS = PREDEFINE_NAMESPACE_STATUS;
exports.RELATION_NAMES = RELATION_NAMES;
exports.RELATION_NAME_AGENCY = RELATION_NAME_AGENCY;
exports.RELATION_NAME_APP = RELATION_NAME_APP;
exports.RELATION_NAME_CIVILIAN = RELATION_NAME_CIVILIAN;
exports.RELATION_NAME_CUSTOMER = RELATION_NAME_CUSTOMER;
exports.RELATION_NAME_INTERNAL = RELATION_NAME_INTERNAL;
exports.RELATION_TYPES = RELATION_TYPES;
exports.RELATION_TYPE_APP = RELATION_TYPE_APP;
exports.RELATION_TYPE_INDIVIDUAL = RELATION_TYPE_INDIVIDUAL;
exports.RELATION_TYPE_ORGANIZATION = RELATION_TYPE_ORGANIZATION;
exports.RELATION_TYPE_WORKER = RELATION_TYPE_WORKER;
exports.VISIBILITIES = VISIBILITIES;
exports.VISIBILITY_PRIVATE = VISIBILITY_PRIVATE;
exports.VISIBILITY_PUBLIC = VISIBILITY_PUBLIC;
exports.WORKSPACES = WORKSPACES;
exports.WORKSPACE_CALL_CENTER = WORKSPACE_CALL_CENTER;
exports.WORKSPACE_CUSTOMER_CARE = WORKSPACE_CUSTOMER_CARE;
exports.WORKSPACE_OTHER = WORKSPACE_OTHER;
exports.WORKSPACE_TECHNICAL = WORKSPACE_TECHNICAL;
exports.checkDependenciesFor = checkDependenciesFor;
exports.unlocalize = unlocalize;
