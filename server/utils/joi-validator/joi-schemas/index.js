import joi from 'joi';

export default {
  albumSchema: joi.object().keys({
    title: joi.string()
  })
};
