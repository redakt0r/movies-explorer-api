const moviesRouter = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', postMovie);
moviesRouter.delete('/:_id', deleteMovieById);

module.exports = moviesRouter;
