const { celebrate, Joi } = require('celebrate');
const { URL_REG_EXP, EMAIL_REG_EXP } = require('../utils/constants');

module.exports.signInRequestValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(EMAIL_REG_EXP).message('Некорректный email'),
    password: Joi.string().required(),
  }),
});

module.exports.signUpRequestValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(EMAIL_REG_EXP).message('Некорректный email'),
    password: Joi.string().required().min(4),
  }),
});

module.exports.postMovieRequestValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(URL_REG_EXP).message('Некорректная ссылка'),
  }),
});

module.exports.deleteMovieRequestValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).required().hex(),
  }),
});

module.exports.getUserInfoRequestValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required().hex(),
  }),
});

module.exports.updateUserInfoRequestValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(EMAIL_REG_EXP).message('Некорректный email'),
  }),
});
