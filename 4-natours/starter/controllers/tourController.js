const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (request, response, next, value) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTour = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find((tour) => tour.id === id * 1);

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (request, response) => {
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

exports.updateTour = (request, response) => {
  const tour = tours.find((tour) => tour.id === id * 1);

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.deleteTour = (request, response) => {
  response.status(204).json({
    status: 'success',
    data: null,
  });
};
