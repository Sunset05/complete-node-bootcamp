const { request } = require('express');
const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
app.use(express.json());

app.use((request, response, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (request, response) => {
  const { id } = request.params;
  const tour = tours.find((tour) => tour.id === id * 1);

  if (!tour) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (request, response) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, request.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      response.status(201).json({
        satus: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (request, response) => {
  const { id } = request.params;
  const tour = tours.find((tour) => tour.id === id * 1);

  if (!tour) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  response.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>...',
    },
  });
};

const deleteTour = (request, response) => {
  console.log('deleted');
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
