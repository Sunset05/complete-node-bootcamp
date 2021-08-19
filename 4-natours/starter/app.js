const express = require('express');
const morgan = require('morgan');

const app = express();

const { tourRouter } = require(`${__dirname}/routes/tourRoutes`);
const { userRouter } = require(`${__dirname}/routes/userRoutes`);

// 1) MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

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
