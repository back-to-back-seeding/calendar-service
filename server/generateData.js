const fs = require('fs');

const writeRooms = fs.createWriteStream('rooms.csv');
writeRooms.write('id,minimum_stay,maximum_guest,reviews,rating\n', 'utf8');

function generateRatings() {
  function genRand(min, max, decimalPlaces) {
    // eslint-disable-next-line max-len
    const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
    const power = 10 ** decimalPlaces;
    return Math.floor(rand * power) / power;
  }

  const a = [];
  for (let i = 0; i < 100; i += 1) {
    a.push(genRand(3, 5, 2));
  }
  return a;
}

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  const ratingsArray = generateRatings();
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const minimumStay = i % 6;
      const maximumGuest = i % 16;
      const reviews = i % 200;
      const rating = ratingsArray[i % 100];
      const data = `${id},${minimumStay},${maximumGuest},${reviews},${rating}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeRooms, 'utf-8', () => {
  writeRooms.end();
});
