'use strict';


/* dependencies */
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { MissingSchemaError } = mongoose.Error;


/* constants */
Object.defineProperties(exports, {
  ACCOUNT_MODEL_NAME: {
    get: function () {
      return 'Account';
    }
  },
  CONTENT_MODEL_NAME: {
    get: function () {
      return 'Content';
    }
  },
  JURISDICTION_MODEL_NAME: {
    get: function () {
      return 'Jurisdiction';
    }
  },
  PRIORITY_MODEL_NAME: {
    get: function () {
      return 'Priority';
    }
  },
  STATUS_MODEL_NAME: {
    get: function () {
      return 'Status';
    }
  },
  SERVICEGROUP_MODEL_NAME: {
    get: function () {
      return 'ServiceGroup';
    }
  },
  SERVICE_MODEL_NAME: {
    get: function () {
      return 'Service';
    }
  },
  SERVICEREQUEST_MODEL_NAME: {
    get: function () {
      return 'ServiceRequest';
    }
  }
});


/* helpers */
exports.getModel = function getModel(modelName) {

  //try obtain model
  try {
    const Model = mongoose.model(modelName);
    return Model;
  }

  //catch error
  catch (error) {

    //ignore missing schema error
    if (!(error instanceof MissingSchemaError)) {
      throw error;
    }

    //unknown model
    return undefined;

  }

};


/**
 * @name checkDependencies
 * @descriptions check if there are dependencies with instances already
 * saved before deleting the parent model
 *
 * @param {object} optns valid options
 * @param {string} optns.path parent path on dependant
 * @param {string[]} optns.dependencies model name of the dependants
 * @param {Function} done a callback to invoke on success or failure
 *
 * @since 0.5.0
 * @version 0.1.0
 */
exports.checkDependencies = function (optns, done) {

  //ensure options
  const options = _.merge({}, optns);

  //obtain path
  const { path, dependencies } = options;

  //ensure parent path
  if (_.isEmpty(path)) {
    return done();
  }

  //ensure dependencies
  if (_.isEmpty(dependencies)) {
    return done();
  }

  //prepare dependencies checker
  let dependants = {};
  _.forEach(dependencies, function (dependency) {

    //requirements
    const dependantKey = `check${dependency}Dependency`;
    const Dependant = exports.getModel(dependency);
    const dependantLabel =
      _.chain(dependency).snakeCase().split('_').join(' ').value();

    //restrict per existing model
    if (Dependant) {

      //collect dependant cleaner
      dependants[dependantKey] = function (next) {

        Dependant.count({
          [path]: this._id
        }, function (error, count) {

          //warn can not delete due to dependencies
          if (count && count > 0) {
            const errorMessage =
              `Fail to Delete. ${count} ${dependantLabel} depend on it`;
            error = new Error(errorMessage);
          }

          //ensure error status
          if (error) {
            error.status = 400;
          }

          //return
          next(error, this);

        }.bind(this));

      }.bind(this);
    }

  }.bind(this));


  //check dependencies
  if (!_.isEmpty(dependants)) {
    async.parallel(dependants, function (error) {
      return done(error, this);
    }.bind(this));
  }

  //continue
  else {
    return done();
  }


};
