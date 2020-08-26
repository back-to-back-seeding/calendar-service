const db = require('../database');

class Room {
  getAll(id, callback) {
      // declare query string
    const queryString = 'SELECT rooms.nightly_fee, rooms.rating, rooms.reviews, rooms.minimum_stay, rooms.maximum_guest, reservations.id, reservations.booked_date FROM rooms, reservations WHERE rooms.id = ? AND rooms.id = reservations.room_id ORDER BY reservations.booked_date;';
    // declare query params
    const queryParams = [req.params.room_id];
    // get all the informations and reservations of a specify room with the room_id from the endpoint
    db.connection.query(queryString, queryParams, function(error, results, fields){
      if (error) {
        console.log("Failed to get data from databases: ", error);
        res.status(404).send(error);
      } else {
        console.log("Succeed to get data from databases");
        res.status(200).send(results);
      }
    });
  }
}

module.exports = new Room();``