const JWT = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const AuthorizationError = require('../errors/AuthorizationError');

module.exports.auth = (req, _res, next) => {
  if (!req.cookies.jwt) { throw new AuthorizationError('Необходима авторизация'); }
  const token = req.cookies.jwt;
  let payload;
  try { payload = JWT.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret'); } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
