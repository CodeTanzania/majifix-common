import { forEach, isEmpty, join, split, snakeCase } from 'lodash';
import { parallel } from 'async';
import { mergeObjects, idOf } from '@lykmapipo/common';
import { getString } from '@lykmapipo/env';
import { toCollectionName, copyInstance, isInstance, model } from '@lykmapipo/mongoose-common';

/* models name */
const MODEL_NAME_ACCOUNT = 'Account';
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
const COLLECTION_NAME_ACCOUNT = toCollectionName(MODEL_NAME_ACCOUNT);
const COLLECTION_NAME_CONTENT = toCollectionName(MODEL_NAME_CONTENT);
const COLLECTION_NAME_CHANGELOG = toCollectionName(MODEL_NAME_CHANGELOG);
const COLLECTION_NAME_ITEM = toCollectionName(MODEL_NAME_ITEM);
const COLLECTION_NAME_JURISDICTION = toCollectionName(
  MODEL_NAME_JURISDICTION
);
const COLLECTION_NAME_PARTY = toCollectionName(MODEL_NAME_PARTY);
const COLLECTION_NAME_PERMISSION = toCollectionName(
  MODEL_NAME_PERMISSION
);
const COLLECTION_NAME_PREDEFINE = toCollectionName(MODEL_NAME_PREDEFINE);
const COLLECTION_NAME_PRIORITY = toCollectionName(MODEL_NAME_PRIORITY);
const COLLECTION_NAME_ROLE = toCollectionName(MODEL_NAME_ROLE);
const COLLECTION_NAME_STATUS = toCollectionName(MODEL_NAME_STATUS);
const COLLECTION_NAME_SERVICEGROUP = toCollectionName(
  MODEL_NAME_SERVICEGROUP
);
const COLLECTION_NAME_SERVICE = toCollectionName(MODEL_NAME_SERVICE);
const COLLECTION_NAME_SERVICEREQUEST = toCollectionName(
  MODEL_NAME_SERVICEREQUEST
);
const COLLECTION_NAME_SERVICETYPE = toCollectionName(
  MODEL_NAME_SERVICETYPE
);
const COLLECTION_NAME_ZONE = toCollectionName(MODEL_NAME_ZONE);

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

/* utilities */

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
  const localized = copyInstance(data);

  // unlocalize each locale for a path
  forEach(localized, (value, locale) => {
    // handle default locale
    const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
    if (locale === DEFAULT_LOCALE) {
      unlocalized[path] = value;
    }

    // handle other locales
    const key = `${path}_${locale}`;
    unlocalized[key] = value;
  });

  // return unlocalized object
  return mergeObjects(unlocalized);
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
  const options = mergeObjects(optns);

  // obtain path
  const { path, dependencies } = options;

  // ensure valid model instance for parent
  if (!isInstance(parent)) {
    return done();
  }

  // ensure parent path
  if (isEmpty(path)) {
    return done();
  }

  // ensure dependencies
  if (isEmpty(dependencies)) {
    return done();
  }

  // accumaltor for dependencies checker
  const dependants = {};

  // check for provided dependency
  const checkDependency = dependency => {
    const dependantKey = `check${dependency}Dependency`;
    const Dependant = model(dependency);
    const dependantLabel = join(split(snakeCase(dependency), '_'), ' ');
    const criteria = { [path]: idOf(parent) };

    // restrict per existing model
    // collect dependant cleaner
    if (Dependant && !isEmpty(criteria)) {
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
  forEach(dependencies, checkDependency);

  // check for all dependencies
  if (!isEmpty(dependants)) {
    return parallel(dependants, error => done(error, parent));
  }

  // continue
  return done();
};

export { COLLECTION_NAME_ACCOUNT, COLLECTION_NAME_CHANGELOG, COLLECTION_NAME_CONTENT, COLLECTION_NAME_ITEM, COLLECTION_NAME_JURISDICTION, COLLECTION_NAME_PARTY, COLLECTION_NAME_PERMISSION, COLLECTION_NAME_PREDEFINE, COLLECTION_NAME_PRIORITY, COLLECTION_NAME_ROLE, COLLECTION_NAME_SERVICE, COLLECTION_NAME_SERVICEGROUP, COLLECTION_NAME_SERVICEREQUEST, COLLECTION_NAME_SERVICETYPE, COLLECTION_NAME_STATUS, COLLECTION_NAME_ZONE, MODEL_NAME_ACCOUNT, MODEL_NAME_CHANGELOG, MODEL_NAME_CONTENT, MODEL_NAME_ITEM, MODEL_NAME_JURISDICTION, MODEL_NAME_PARTY, MODEL_NAME_PERMISSION, MODEL_NAME_PREDEFINE, MODEL_NAME_PRIORITY, MODEL_NAME_ROLE, MODEL_NAME_SERVICE, MODEL_NAME_SERVICEGROUP, MODEL_NAME_SERVICEREQUEST, MODEL_NAME_SERVICETYPE, MODEL_NAME_STATUS, MODEL_NAME_ZONE, PATH_NAME_ACCOUNT, PATH_NAME_ASSIGNEE, PATH_NAME_CONTENT, PATH_NAME_ITEM, PATH_NAME_JURISDICTION, PATH_NAME_OPERATOR, PATH_NAME_PARTY, PATH_NAME_PERMISSION, PATH_NAME_PRIORITY, PATH_NAME_ROLE, PATH_NAME_SERVICE, PATH_NAME_SERVICEGROUP, PATH_NAME_SERVICEREQUEST, PATH_NAME_SERVICETYPE, PATH_NAME_STATUS, PATH_NAME_ZONE, POPULATION_DEFAULT, POPULATION_MAX_DEPTH, PREDEFINE_BUCKET_BLOCKREASON, PREDEFINE_BUCKET_PRIORITY, PREDEFINE_BUCKET_SERVICE, PREDEFINE_BUCKET_SERVICEGROUP, PREDEFINE_BUCKET_SERVICETYPE, PREDEFINE_BUCKET_STATUS, PREDEFINE_NAMESPACE_BLOCKREASON, PREDEFINE_NAMESPACE_PRIORITY, PREDEFINE_NAMESPACE_SERVICE, PREDEFINE_NAMESPACE_SERVICEGROUP, PREDEFINE_NAMESPACE_SERVICETYPE, PREDEFINE_NAMESPACE_STATUS, checkDependenciesFor, unlocalize };
