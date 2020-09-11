const fs = require('fs');
const moment = require('moment');

const MAX_ROOMS = 10000000;
const MAX_USERS = 100000;

function genRandDecimal(min, max, decimalPlaces) {
  // eslint-disable-next-line max-len
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
  const power = 10 ** decimalPlaces;
  return Math.floor(rand * power) / power;
}

function generateRatings() {
  const a = [];
  for (let i = 0; i < 100; i += 1) {
    a.push(genRandDecimal(3, 5, 2));
  }
  return a;
}

function getRandomFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function writeNRooms(n, writer, encoding, callback) {
  let i = n;
  let id = 0;
  const ratingsArray = generateRatings();
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const minimumStay = (i % 6) + 1;
      const maximumGuest = (i % 16) + 1;
      const reviews = i % 200;
      const rating = ratingsArray[i % ratingsArray.length];
      const data = `${id},${minimumStay},${maximumGuest},${reviews},${rating}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

function writeNUsers(n, writer, encoding, callback) {
  let i = n;
  let id = 0;
  const firstNames = ['Alex', 'Antonio', 'Blanca', 'Carrie', 'Chong Hang Ho', 'Chris', 'Ciel', 'Dan', 'Erfan', 'Eugene', 'Jae', 'Jared', 'Jaycie', 'Jorge', 'Junlin', 'Jusheen', 'Maureen', 'Michael', 'Nim', 'Reed', 'Susan', 'Tom', 'Tong', 'Yui', 'Destiny', 'Rob', 'Brian', 'Minji', 'Mylani', 'Sokhary', 'Rebecca'];
  const lastNames = ['Anderson', 'Ashwoon', 'Aikin', 'Bateman', 'Bongard', 'Bowers', 'Boyd', 'Cannon', 'Cast', 'Deitz', 'Dewalt', 'Ebner', 'Frick', 'Hancock', 'Haworth', 'Hesch', 'Hoffman', 'Kassing', 'Knutson', 'Lawless', 'Lawicki', 'Mccord', 'McCormack', 'Miller', 'Myers', 'Nugent', 'Ortiz', 'Orwig', 'Ory', 'Paiser', 'Pak', 'Pettigrew', 'Quinn', 'Quizoz', 'Ramachandran', 'Resnick', 'Sagar', 'Schickowski', 'Schiebel', 'Sellon', 'Severson', 'Shaffer', 'Solberg', 'Soloman', 'Sonderling', 'Soukup', 'Soulis', 'Stahl', 'Sweeney', 'Tandy', 'Trebil', 'Trusela', 'Trussel', 'Turco', 'Uddin', 'Uflan', 'Ulrich', 'Upson', 'Vader', 'Vail', 'Valente', 'Van Zandt', 'Vanderpoel', 'Ventotla', 'Vogal', 'Wagle', 'Wagner', 'Wakefield', 'Weinstein', 'Weiss', 'Woo', 'Yang', 'Yates', 'Yocum', 'Zeaser', 'Zeller', 'Ziegler', 'Bauer', 'Baxster', 'Casal', 'Cataldi', 'Caswell', 'Celedon', 'Chambers', 'Chapman', 'Christensen', 'Darnell', 'Davidson', 'Davis', 'DeLorenzo', 'Dinkins', 'Doran', 'Dugelman', 'Dugan', 'Duffman', 'Eastman', 'Ferro', 'Ferry', 'Fletcher', 'Fietzer', 'Hylan', 'Hydinger', 'Illingsworth', 'Ingram', 'Irwin', 'Jagtap', 'Jenson', 'Johnson', 'Johnsen', 'Jones', 'Jurgenson', 'Kalleg', 'Kaskel', 'Keller', 'Leisinger', 'LePage', 'Lewis', 'Linde', 'Lulloff', 'Maki', 'Martin', 'McGinnis', 'Mills', 'Moody', 'Moore', 'Napier', 'Nelson', 'Norquist', 'Nuttle', 'Olson', 'Ostrander', 'Reamer', 'Reardon', 'Reyes', 'Rice', 'Ripka', 'Roberts', 'Rogers', 'Root', 'Sandstrom', 'Sawyer', 'Schlicht', 'Schmitt', 'Schwager', 'Schutz', 'Schuster', 'Tapia', 'Thompson', 'Tiernan', 'Tisler'];

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const data = `${id},${firstName},${lastName},${firstName}_${lastName}@gmmail.com,#${firstName}${lastName}#\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

function generateDates() {
  const dates = [];
  const date = moment();
  let days = 0;
  while (days <= 90) {
    days += getRandomFromInterval(1, 3);
    const checkIn = date.add(days, 'days').format('YYYY-MM-DD');
    const inc = getRandomFromInterval(1, 4);
    const checkOut = date.add(inc, 'days').format('YYYY-MM-DD');
    days += inc;
    dates.push({ checkIn, checkOut });
  }
  return dates;
}

function writeNReservations(n, writer, encoding, callback) {
  let i = n;
  let id = 0;
  const datesArray = generateDates();
  let index = 0;
  function write() {
    let ok = true;
    do {
      if (index === datesArray.length - 1) {
        index = 0;
        i -= 1;
      } else {
        index += 1;
      }
      id += 1;
      const roomId = i;
      const userId = id % MAX_USERS;
      const guests = (i % 16) + 1;
      const data = `${id},${datesArray[index].checkIn},${datesArray[index].checkOut},${guests},${roomId},${userId}\n`;
      if (i === 1 && index === datesArray.length - 1) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while ((i > 1 || (i === 1 && index < datesArray.length - 1)) && ok);
    if ((i > 1 || (i === 1 && index < datesArray.length - 1))) {
      writer.once('drain', write);
    }
  }
  write();
}

function generatePrices() {
  const prices = [];
  for (let i = 0; i < 100; i += 1) {
    prices.push(getRandomFromInterval(200, 900));
  }
  return prices;
}

function writeNPrices(n, writer, encoding, callback) {
  let i = n;
  let id = 0;
  const dates = generateDates();
  const prices = generatePrices();
  let index = 0;
  function write() {
    let ok = true;
    do {
      if (index === dates.length - 1) {
        index = 0;
        i -= 1;
      } else {
        index += 1;
      }
      id += 1;
      const roomId = i;
      const price = prices[id % prices.length];
      const data = `${id},${dates[index].checkIn},${dates[index].checkOut},${price},${roomId}\n`;
      if (i === 1 && index === dates.length - 1) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while ((i > 1 || (i === 1 && index < dates.length - 1)) && ok);
    if ((i > 1 || (i === 1 && index < dates.length - 1))) {
      writer.once('drain', write);
    }
  }
  write();
}

function generateAllDates() {
  const dates = [];
  const date = moment();
  let i = 1;
  while (i <= 90) {
    dates.push(date.add(1, 'days').format('YYYY-MM-DD'));
    i += 1;
  }
  return dates;
}

function writeNPricesPerDay(n, writer, encoding, callback) {
  let i = n;
  const dates = generateAllDates();
  const prices = generatePrices();
  let index = 0;
  function write() {
    let ok = true;
    do {
      if (index === dates.length - 1) {
        index = 0;
        i -= 1;
      } else {
        index += 1;
      }
      const roomId = i;
      const price = prices[i % prices.length];
      const data = `${roomId},${dates[index]},${price}\n`;
      if (i === 1 && index === dates.length - 1) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while ((i > 1 || (i === 1 && index < dates.length - 1)) && ok);
    if ((i > 1 || (i === 1 && index < dates.length - 1))) {
      writer.once('drain', write);
    }
  }
  write();
}

 const writeRooms = fs.createWriteStream('rooms.csv');
 writeRooms.write('id,minimum_stay,maximum_guest,reviews,rating\n', 'utf8');
 writeNRooms(MAX_ROOMS, writeRooms, 'utf-8', () => {
   writeRooms.end();
 });

// const writeUsers = fs.createWriteStream('users.csv');
// writeUsers.write('id,first_name,last_name,email,password\n', 'utf8');
// writeNUsers(MAX_USERS, writeUsers, 'utf-8', () => {
//   writeUsers.end();
// });

//const writeReservations = fs.createWriteStream('reservations.csv');
//writeReservations.write('id,check_in,check_out,guests,room_id,user_id\n', 'utf8');
//writeNReservations(MAX_ROOMS, writeReservations, 'utf-8', () => {
//  writeReservations.end();
//});

// const writePrices = fs.createWriteStream('prices.csv');
// writePrices.write('id,from_date,to_date,price,room_id\n', 'utf8');
// writeNPrices(MAX_ROOMS, writePrices, 'utf-8', () => {
//   writePrices.end();
// });

// const writePricesDay = fs.createWriteStream('pricesDay.csv');
// writePricesDay.write('room_id,date,price\n', 'utf8');
// writeNPricesPerDay(MAX_ROOMS, writePricesDay, 'utf-8', () => {
//   writePricesDay.end();
// });
