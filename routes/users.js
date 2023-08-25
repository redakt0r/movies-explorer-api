const usersRouter = require('express').Router();

const {
  getUserInfo,
  patchUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', patchUserInfo);

module.exports = usersRouter;
