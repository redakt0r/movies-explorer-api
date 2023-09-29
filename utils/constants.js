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

const ITEM_NOT_FOUND_ERROR_MESSAGE = 'Фильм не найден';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким Email уже существует';
const SIGN_OUT_MESSAGE = 'Вы вышли из приложения';
const MOVIE_DELETED_MESSAGE = 'Фильм удален';
const FORBIDDEN_ERROR_MESSAGE = 'Чужой фильм нельзя удалить';
const INCORRECT_ID_ERROR_MESSAGE = 'Некорректный ID';
const PAGE_NOT_FOUND_ERROR_MESSAGE = 'Страница не найдена';
const AUTHORIZATION_REQUIRED_ERROR_MESSAGE = 'Необходима авторизация';
const AUTHORIZATION_INCORRECT_ERROR_MESSAGE = 'Неправильные почта или пароль';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const URL_REG_EXP_ERROR_MESSAGE = 'Некорректная ссылка';
const EMAIL_REG_EXP_ERROR_MESSAGE = 'Некорректный email';

module.exports = {
  STATUS_OK,
  PORT,
  DB_URL,
  URL_REG_EXP,
  EMAIL_REG_EXP,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  SECRET_KEY,
  ITEM_NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  SIGN_OUT_MESSAGE,
  MOVIE_DELETED_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  INCORRECT_ID_ERROR_MESSAGE,
  PAGE_NOT_FOUND_ERROR_MESSAGE,
  AUTHORIZATION_REQUIRED_ERROR_MESSAGE,
  AUTHORIZATION_INCORRECT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  URL_REG_EXP_ERROR_MESSAGE,
  EMAIL_REG_EXP_ERROR_MESSAGE,
};
