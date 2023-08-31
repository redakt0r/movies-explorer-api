const { celebrate, Joi } = require('celebrate');
const {
  URL_REG_EXP,
  EMAIL_REG_EXP,
  URL_REG_EXP_ERROR_MESSAGE,
  EMAIL_REG_EXP_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.signInRequestValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(EMAIL_REG_EXP).message(EMAIL_REG_EXP_ERROR_MESSAGE),
    password: Joi.string().required(),
  }),
});

module.exports.signUpRequestValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(EMAIL_REG_EXP).message(EMAIL_REG_EXP_ERROR_MESSAGE),
    password: Joi.string().required().min(4),
  }),
});

module.exports.postMovieRequestValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().regex(URL_REG_EXP).message(URL_REG_EXP_ERROR_MESSAGE),
    trailerLink: Joi.string().required().regex(URL_REG_EXP).message(URL_REG_EXP_ERROR_MESSAGE),
    thumbnail: Joi.string().required().regex(URL_REG_EXP).message(URL_REG_EXP_ERROR_MESSAGE),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieRequestValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).required().hex(),
  }),
});

module.exports.updateUserInfoRequestValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(EMAIL_REG_EXP).message(EMAIL_REG_EXP_ERROR_MESSAGE),
  }),
});
