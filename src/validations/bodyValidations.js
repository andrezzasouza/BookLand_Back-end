/* eslint-disable no-useless-escape */
import Joi from 'joi';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringWithOnlyNumbers = /^[0-9]+$/;
const expirationDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
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

const deliverySchema = Joi.object()
  .length(6)
  .keys({
    state: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    street: Joi.string().required(),
    CEP: Joi.string().pattern(stringWithOnlyNumbers).required(),
    complement: Joi.string().allow('', null),
  });

const paymentSchema = Joi.object()
  .length(5)
  .keys({
    network: Joi.string().required(),
    cardName: Joi.string().required(),
    cardNumber: Joi.string().pattern(stringWithOnlyNumbers).required(),
    expirationDate: Joi.string().pattern(expirationDatePattern).required(),
    CVV: Joi.string().pattern(stringWithOnlyNumbers).required(),
  });

const cartQuantitySchema = Joi.object()
  .length(2)
  .keys({
    bookId: Joi.number().integer().required(),
    bookQuantity: Joi.number().integer().required(),
  });

export {
  signUpSchema, signInSchema, deliverySchema, paymentSchema, cartQuantitySchema,
};
