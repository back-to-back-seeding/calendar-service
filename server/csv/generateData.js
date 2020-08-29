const fs = require('fs');

const MAX_DATA = 10;

function genRand(min, max, decimalPlaces) {
  // eslint-disable-next-line max-len
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
  const power = 10 ** decimalPlaces;
  return Math.floor(rand * power) / power;
}

function generateRatings() {
  const a = [];
  for (let i = 0; i < 100; i += 1) {
    a.push(genRand(3, 5, 2));
  }
  return a;
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

const writeRooms = fs.createWriteStream('rooms.csv');
writeRooms.write('id,minimum_stay,maximum_guest,reviews,rating\n', 'utf8');
writeNRooms(MAX_DATA, writeRooms, 'utf-8', () => {
  writeRooms.end();
});

const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('id,first_name,last_name,email,password\n', 'utf8');
writeNUsers(MAX_DATA, writeUsers, 'utf-8', () => {
  writeUsers.end();
});