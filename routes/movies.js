const moviesRouter = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  postMovieRequestValidation,
  deleteMovieRequestValidation,
} = require('../middlewares/request-validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', postMovieRequestValidation, postMovie);
moviesRouter.delete('/:_id', deleteMovieRequestValidation, deleteMovieById);

module.exports = moviesRouter;
