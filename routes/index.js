const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./films');
const { auth } = require('../middlewares/auth');
const { signUp, signIn, signOut } = require('../controllers/users');

router.use('/signin', signIn);
router.use('/signup', signUp);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/signout', signOut);

module.exports = router;
