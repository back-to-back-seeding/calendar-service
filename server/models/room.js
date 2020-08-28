/* eslint-disable class-methods-use-this */
const db = require('../database');

class Room {
  getAll(callback) {
    const queryString = 'SELECT * from rooms';
    db.connection.query(queryString, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }
}

module.exports = new Room();
