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
}

module.exports = new Room();
