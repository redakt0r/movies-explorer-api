const usersRouter = require('express').Router();

const { getUserInfo, patchUserInfo } = require('../controllers/users');
const {
  getUserInfoRequestValidation,
  updateUserInfoRequestValidation,
} = require('../middlewares/request-validation');

usersRouter.get('/me', getUserInfoRequestValidation, getUserInfo);
usersRouter.patch('/me', updateUserInfoRequestValidation, patchUserInfo);

module.exports = usersRouter;
