const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { signUp, signIn, signOut } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signUp);
router.use('/signin', signIn);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/signout', signOut);

router.use('*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = router;
