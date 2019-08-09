/* dependencies */
const _ = require('lodash');
const async = require('async');
const { model } = require('@lykmapipo/mongoose-common');

/* model name */
const MODELS = {
  ACCOUNT_MODEL_NAME: 'Account',
  CONTENT_MODEL_NAME: 'Content',
  CHANGELOG_MODEL_NAME: 'Changelog',
  JURISDICTION_MODEL_NAME: 'Jurisdiction',
  PARTY_MODEL_NAME: 'Party',
  PERMISSION_MODEL_NAME: 'Permission',
  PRIORITY_MODEL_NAME: 'Priority',
  ROLE_MODEL_NAME: 'Role',
  STATUS_MODEL_NAME: 'Status',
  SERVICEGROUP_MODEL_NAME: 'ServiceGroup',
  SERVICE_MODEL_NAME: 'Service',
  SERVICEREQUEST_MODEL_NAME: 'ServiceRequest',
};

/* assign model names  */
_.forEach(MODELS, (modelName, modelKey) => {
  // ensure model not exists
  if (!_.has(exports, modelKey)) {
    // define model name getter
    Object.defineProperties(exports, {
      [modelKey]: {
        get() {
          return modelName;
        },
      },
    });
  }
});

/**
 * @name checkDependencies
 * @description check if there are dependencies with instances already
 * saved before deleting the parent model
 *
 * @param {object} optns valid options
 * @param {string} optns.path parent path on dependant
 * @param {string[]} optns.dependencies model name of the dependants
 * @param {Function} done a callback to invoke on success or failure
 * @returns {Function} dependencies cleaner
 *
 * @since 0.5.0
 * @version 0.1.0
 */
exports.checkDependencies = (optns, done) => {
  // ensure options
  const options = _.merge({}, optns);

  // obtain path
  const { path, dependencies } = options;

  // ensure parent path
  if (_.isEmpty(path)) {
    return done();
  }

  // ensure dependencies
  if (_.isEmpty(dependencies)) {
    return done();
  }

  // prepare dependencies checker
  const dependants = {};
  _.forEach(dependencies, dependency => {
    // requirements
    const dependantKey = `check${dependency}Dependency`;
    const Dependant = model(dependency);
    const dependantLabel = _.chain(dependency)
      .snakeCase()
      .split('_')
      .join(' ')
      .value();

    // restrict per existing model
    if (Dependant) {
      // collect dependant cleaner
      dependants[dependantKey] = next => {
        Dependant.count(
          {
            [path]: _.get(this, '_id'),
          },
          (error, count) => {
            let exception = error;

            // warn can not delete due to dependencies
            if (count && count > 0) {
              const errorMessage = `Fail to Delete. ${count} ${dependantLabel} depend on it`;
              exception = new Error(errorMessage);
            }

            // ensure error status
            if (exception) {
              exception.status = 400;
            }

            // return
            next(exception, this);
          }
        );
      };
    }
  });

  // check dependencies
  if (!_.isEmpty(dependants)) {
    return async.parallel(dependants, error => done(error, this));
  }

  // continue
  return done();
};
