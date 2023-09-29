const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');
const { EMAIL_REG_EXP_ERROR_MESSAGE, AUTHORIZATION_INCORRECT_ERROR_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: EMAIL_REG_EXP_ERROR_MESSAGE,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: false,
      minLength: [2, 'Минимальная длина поля "name" - 2, вы ввели `{VALUE}`'],
      maxLength: [30, 'Максимальная длина поля "name" - 30, вы ввели `{VALUE}`'],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) { throw new AuthorizationError(AUTHORIZATION_INCORRECT_ERROR_MESSAGE); }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { throw new AuthorizationError(AUTHORIZATION_INCORRECT_ERROR_MESSAGE); }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
