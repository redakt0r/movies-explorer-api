const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { signUp, signIn, signOut } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  signInRequestValidation,
  signUpRequestValidation,
} = require('../middlewares/request-validation');
const { PAGE_NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

router.use('/signup', signUpRequestValidation, signUp);
router.use('/signin', signInRequestValidation, signIn);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/users', auth, usersRouter);
router.use('/signout', auth, signOut);

router.use('*', auth, () => { throw new NotFoundError(PAGE_NOT_FOUND_ERROR_MESSAGE); });

module.exports = router;
