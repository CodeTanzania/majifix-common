'use strict';


/* dependencies */
const mongoose = require('mongoose');
const { MissingSchemaError } = mongoose.Error;


/* constants */
Object.defineProperties(exports, {
  JURISDICTION_MODEL_NAME: {
    get: function () {
      return 'Jurisdiction';
    }
  },
  STATUS_MODEL_NAME: {
    get: function () {
      return 'Status';
    }
  },
  PRIORITY_MODEL_NAME: {
    get: function () {
      return 'Priority';
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
