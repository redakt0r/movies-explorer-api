const Movie = require('../models/movie');
const { STATUS_OK } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');

const NotFoundError = require('../errors/NotFoundError');

const ForbiddenError = require('../errors/NotFoundError');

module.exports.getMovies = (_req, res, next) => {
  Movie.find({})
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
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) { throw new ForbiddenError('Чужой фильм нельзя удалить'); }
      Movie.deleteOne(movie)
        .then(() => res.send('Фильм удален'));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') { throw new BadRequestError('Некорректный ID'); }
      next(err);
    })
    .catch(next);
};
