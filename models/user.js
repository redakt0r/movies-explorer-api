const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный Email',
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
      if (!user) { throw new AuthorizationError('Неправильные почта или пароль'); }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { throw new AuthorizationError('Неправильные почта или пароль'); }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
