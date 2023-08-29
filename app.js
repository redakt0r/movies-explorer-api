require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const rateLimit = require('express-rate-limit');

const cors = require('cors');

const { errorHandler } = require('./middlewares/error-handler');
const { PORT, DB_URL, ALLOWED_CORS } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(DB_URL, {});

app.use(cors({ origin: ALLOWED_CORS, credentials: true }));

app.use(limiter);

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App слушает ${PORT}`);
});
