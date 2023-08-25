const usersRouter = require('express').Router();

const {
  getUserInfo,
  patchUserInfo,
  signUp,
  signIn,
  signOut,
} = require('../controllers/users');

usersRouter.post('/signin', signIn);
usersRouter.post('/signup', signUp);

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', patchUserInfo);

usersRouter.post('/signout', signOut);

module.exports = usersRouter;
