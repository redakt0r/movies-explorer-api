const usersRouter = require('express').Router();

const { getUserInfo, patchUserInfo } = require('../controllers/users');
const { updateUserInfoRequestValidation } = require('../middlewares/request-validation');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', updateUserInfoRequestValidation, patchUserInfo);

module.exports = usersRouter;
