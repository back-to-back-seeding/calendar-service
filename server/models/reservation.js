/* eslint-disable class-methods-use-this */

const db = require('../database');

class Reservation {
  getReservationsByRoomId(roomId, callback) {
    const queryString = 'SELECT rooms.nightly_fee, rooms.rating, rooms.reviews, rooms.minimum_stay, rooms.maximum_guest, reservations.id, reservations.booked_date FROM rooms, reservations WHERE rooms.id = ? AND rooms.id = reservations.room_id ORDER BY reservations.booked_date;';
    const queryParams = [roomId];
    db.connection.query(queryString, queryParams, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

  addReservation(checkIn, checkOut, roomId, callback) {
    const dates = [];
    for (let i = checkIn; i <= checkOut; checkIn.add(1, 'days')) {
      dates.push([roomId, checkIn.format('YYYY-MM-DD')]);
    }
    const queryString = 'INSERT INTO reservations (room_id, booked_date) VALUES ?';
    db.connection.query(queryString, [dates], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }
}
module.exports = new Reservation();
