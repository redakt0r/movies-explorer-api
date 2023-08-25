const moviesRouter = require('express').Router();

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/films');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', postMovies);
moviesRouter.delete('/_id', deleteMovies);

module.exports = moviesRouter;
