import { forEach, isEmpty, join, split, snakeCase } from 'lodash';
import { parallel } from 'async';
import { idOf, mergeObjects } from '@lykmapipo/common';
import { getString } from '@lykmapipo/env';
import {
  copyInstance,
  isInstance,
  model,
  toCollectionName,
} from '@lykmapipo/mongoose-common';

/* models name */
export const MODEL_NAME_ACCOUNT = 'Account';
export const MODEL_NAME_ALERT = 'Alert';
export const MODEL_NAME_CONTENT = 'Content';
export const MODEL_NAME_CHANGELOG = 'ChangeLog';
export const MODEL_NAME_ITEM = 'Predefine';
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
export const MODEL_NAME_ZONE = 'Predefine';

/* collections name */
export const COLLECTION_NAME_ACCOUNT = toCollectionName(MODEL_NAME_ACCOUNT);
export const COLLECTION_NAME_ALERT = toCollectionName(MODEL_NAME_ALERT);
export const COLLECTION_NAME_CONTENT = toCollectionName(MODEL_NAME_CONTENT);
export const COLLECTION_NAME_CHANGELOG = toCollectionName(MODEL_NAME_CHANGELOG);
export const COLLECTION_NAME_ITEM = toCollectionName(MODEL_NAME_ITEM);
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
export const COLLECTION_NAME_ZONE = toCollectionName(MODEL_NAME_ZONE);

/* paths name */
export const PATH_NAME_ACCOUNT = 'account';
export const PATH_NAME_ASSIGNEE = 'assignee';
export const PATH_NAME_CONTENT = 'content';
export const PATH_NAME_ITEM = 'item';
export const PATH_NAME_JURISDICTION = 'jurisdiction';
export const PATH_NAME_OPERATOR = 'operator';
export const PATH_NAME_PARTY = 'party';
export const PATH_NAME_PERMISSION = 'permission';
export const PATH_NAME_PRIORITY = 'priority';
export const PATH_NAME_ROLE = 'role';
export const PATH_NAME_STATUS = 'status';
export const PATH_NAME_SERVICEGROUP = 'group';
export const PATH_NAME_SERVICE = 'service';
export const PATH_NAME_SERVICEREQUEST = 'request';
export const PATH_NAME_SERVICETYPE = 'type';
export const PATH_NAME_ZONE = 'zone';

/* population options */
export const POPULATION_MAX_DEPTH = 1;
export const POPULATION_DEFAULT = { maxDepth: POPULATION_MAX_DEPTH };

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
export const unlocalize = (path, data) => {
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
export const checkDependenciesFor = (parent, optns, done) => {
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
