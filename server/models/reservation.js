/* eslint-disable class-methods-use-this */

const db = require('../database');

class Reservation {
  getReservationsByRoomId(roomId, callback) {
    const queryString = 'SELECT * from reservations where room_id= $1';
    db.query(queryString, [roomId], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results.rows);
      }
    });
  }

  addReservation(checkIn, checkOut, guests, roomId, callback) {
    const dates = [];
    // for (let i = checkIn; i <= checkOut; checkIn.add(1, 'days')) {
    //   dates.push([roomId, checkIn.format('YYYY-MM-DD')]);
    // }
    const queryString = 'INSERT INTO reservations (check_in, check_out, guests, room_id) VALUES ?';
    db.connection.query(queryString, [dates], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

  updateReservation(reservation, callback) {
    const queryString = `UPDATE reservations SET check_in = ${reservation.checkIn}, check_out = ${reservation.checkOut} WHERE id = ${reservation.id} `;
    db.connection.query(queryString, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

  deleteReservation(reservationId, callback) {
    const queryString = `DELETE FROM reservations WHERE id = ${reservationId} `;
    db.connection.query(queryString, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }
}
module.exports = new Reservation();
