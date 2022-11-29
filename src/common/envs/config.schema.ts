import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().required(),
});
