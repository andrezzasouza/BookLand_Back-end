import Joi from 'joi';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringWithOnlyNumbers = /^[0-9]+$/;
// eslint-disable-next-line no-useless-escape

const signUpSchema = Joi.object()
  .length(4)
  .keys({
    name: Joi.string().min(1).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().pattern(passwordRegex).required(),
    CPF: Joi.string().pattern(stringWithOnlyNumbers).length(11),
  });

const signInSchema = Joi.object()
  .length(2)
  .keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().pattern(passwordRegex).required(),
  });

export { signUpSchema, signInSchema };
