/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const tokenSchema = Joi.string()
  .length(36)
  .guid({
    version: [
      'uuidv4',
    ],
  })
  .required();

export { tokenSchema };
