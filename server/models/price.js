/* eslint-disable class-methods-use-this */
const db = require('../database');

class Price {
  getPriceByRoomId(roomid, callback) {
    const queryString = 'SELECT * from prices where room_id=$1';
    db.query(queryString, [roomid], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results.rows);
      }
    });
  }
}

module.exports = new Price();
