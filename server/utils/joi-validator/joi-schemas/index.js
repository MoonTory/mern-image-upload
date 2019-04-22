import joi from 'joi';

export default {
  modelSchema: joi.object().keys({
    name: joi.string()
  })
};
