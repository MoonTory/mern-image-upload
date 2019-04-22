import joi from 'joi';
import Schemas from './joi-schemas';

export default {
  validateBody: schema => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);
      // console.log('joi validate result', result.value);

      if (result.error) {
        next(result.error);
      }

      if (!req.value) {
        req.value = {};
      }

      req.value['body'] = result.value;
      next();
    };
  },

  validatePayload: (schema, payload) => {
    // console.log('payload', payload);

    const result = joi.validate(payload, schema);
    // console.log('joi validate result', result.value);

    if (result.error) {
      return false;
    }

    return result.value;
  },

  Schemas
};
