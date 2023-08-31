const JWT = require('jsonwebtoken');

const { SECRET_KEY } = require('../utils/constants');

const AuthorizationError = require('../errors/AuthorizationError');

const { AUTHORIZATION_REQUIRED_ERROR_MESSAGE } = require('../utils/constants');

module.exports.auth = (req, _res, next) => {
  if (!req.cookies.jwt) { throw new AuthorizationError(AUTHORIZATION_REQUIRED_ERROR_MESSAGE); }
  const token = req.cookies.jwt;
  let payload;
  try { payload = JWT.verify(token, SECRET_KEY); } catch (err) {
    throw new AuthorizationError(AUTHORIZATION_REQUIRED_ERROR_MESSAGE);
  }
  req.user = payload;
  next();
};
