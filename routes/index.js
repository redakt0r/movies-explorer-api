const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./films');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
