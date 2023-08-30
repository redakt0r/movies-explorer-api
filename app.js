require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const cors = require('cors');

const { limiter } = require('./utils/rateLimiter');

const { errorHandler } = require('./middlewares/error-handler');
const { PORT, DB_URL, ALLOWED_CORS } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();

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
