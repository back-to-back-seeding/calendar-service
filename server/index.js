// Dependency
const express = require('express');
const newRelic = require('newrelic');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const models = require('./models');

const app = express();
const PORT = 3002;
const publicPath = path.join(__dirname, '/../public');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:room_id', (req, res, next) => {
  expressStaticGzip(publicPath, {
    enableBrotli: true,
    orderPreference: ['br'],
  });
  next();
});

app.get('/rooms/:room_id', (req, res) => {
  models.Room.getRoomById(req.params.room_id, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/rooms/:room_id/reservation', (req, res) => {
  models.Reservation.getReservationsByRoomId(req.params.room_id, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/rooms/:room_id/reservation', (req, res) => {
  const checkIn = moment(req.body.check_in);
  const checkOut = moment(req.body.check_out);
  models.Reservation.addReservation(checkIn, checkOut, req.params.room_id, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(201).send(results);
    }
  });
});

app.put('/rooms/:room_id/reservation/:reservation_id', (req, res) => {
  const reservation = {
    checkIn: moment(req.body.check_in),
    checkOut: moment(req.body.check_out),
    id: req.params.reservation_id,
  };
  models.Reservation.updateReservation(reservation, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.delete('/rooms/:room_id/reservation/:reservation_id', (req, res) => {
  models.Reservation.deleteReservation(req.params.reservation_id,
    (error, results) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(results);
      }
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
