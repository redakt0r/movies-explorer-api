const bcrypt = require('bcryptjs');

const { generateToken } = require('../utils/token');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');

const ConflictError = require('../errors/ConflictError');

const { STATUS_OK, CONFLICT_ERROR_MESSAGE, SIGN_OUT_MESSAGE } = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.send({
      user: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch(next);
};

module.exports.patchUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') { throw new BadRequestError(err.message); }
      if (err.code === 11000) { throw new ConflictError(CONFLICT_ERROR_MESSAGE); }
      next(err);
    })
    .catch(next);
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user.id });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      return res.send({
        user: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

module.exports.signUp = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then(() => res.status(STATUS_OK).send({ email, name }))
        .catch((err) => {
          if (err.name === 'ValidationError') { throw new BadRequestError(err.message); }
          if (err.code === 11000) { throw new ConflictError(CONFLICT_ERROR_MESSAGE); }
          next(err);
        })
        .catch(next);
    });
};

module.exports.signOut = (_req, res) => {
  res.clearCookie('jwt').send({ message: SIGN_OUT_MESSAGE });
};
