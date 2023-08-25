const Film = require('../models/film');
const { STATUS_OK } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');

const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (_req, res, next) => {
  Film.find({})
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
  Film.create({
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
  const { filmId } = req.params;
  Film.findByIdAndDelete(filmId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.kind === 'ObjectId') { throw new BadRequestError('Некорректный ID'); }
      next(err);
    })
    .catch(next);
};
