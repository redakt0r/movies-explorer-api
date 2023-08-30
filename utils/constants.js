/* eslint-disable no-useless-escape */
const STATUS_OK = 201;

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'dev-secret';

const URL_REG_EXP = /^(https?:\/\/)?([\w\.-]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/;
const EMAIL_REG_EXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const ALLOWED_CORS = [
  'http://localhost:3000', 'http://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  STATUS_OK,
  PORT,
  DB_URL,
  URL_REG_EXP,
  EMAIL_REG_EXP,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  SECRET_KEY,
};
