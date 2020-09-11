/* eslint-disable class-methods-use-this */
const db = require('../database');

class Room {
  getAll(callback) {
    const queryString = 'SELECT * from rooms';
    db.query(queryString, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

  getRoomById(id, callback) {
    const queryString = 'SELECT * from rooms where id=$1';
    db.query(queryString, [id], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results.rows);
      }
    });
  }

  addRoom(room, callback) {
    const queryString = 'insert into rooms(minimum_stay, maximum_guest, reviews, rating) values ($1, $2, $3, $4)';
    db.query(queryString, Object.values(room), (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }
}

module.exports = new Room();
