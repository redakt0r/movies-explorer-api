const Movie = require('../models/movie');
const {
  STATUS_OK,
  ITEM_NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  // MOVIE_DELETED_MESSAGE,
  INCORRECT_ID_ERROR_MESSAGE,
} = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');

const NotFoundError = require('../errors/NotFoundError');

const ForbiddenError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  const currentUserId = req.user._id;
  Movie.find({ owner: currentUserId })
    .populate('owner')
    .then((films) => res.send(films))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((film) => res.status(STATUS_OK).send(film))
    .catch((err) => {
      if (err.name === 'ValidationError') { throw new BadRequestError(err.message); }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const movieId = req.params._id;
  Movie.findById(movieId)
    .orFail(() => { throw new NotFoundError(ITEM_NOT_FOUND_ERROR_MESSAGE); })
    .then((movie) => {
      // eslint-disable-next-line max-len
      if (movie.owner.toString() !== req.user._id) { throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE); }
      return Movie.deleteOne(movie)
        .then((deleted) => res.send(deleted));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') { throw new BadRequestError(INCORRECT_ID_ERROR_MESSAGE); }
      next(err);
    })
    .catch(next);
};
