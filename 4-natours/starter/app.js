const express = require('express');
const morgan = require('morgan');

const { tourRouter } = require(`${__dirname}/routes/tourRoutes`);
const { userRouter } = require(`${__dirname}/routes/userRoutes`);

const app = express();

// 1) MIDDLEWARE
//only logs when in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((request, response, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
