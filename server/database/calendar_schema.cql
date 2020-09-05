CREATE KEYSPACE calendar
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};


CREATE TABLE calendar.rooms (
  id int PRIMARY KEY,
  minimum_stay int,
  maximum_guest int,
  reviews int,
  rating decimal
);

CREATE TABLE calendar.prices (
  id int PRIMARY KEY,
  from_date date,
  to_date date,
  price int,
  room_id int
);

CREATE TABLE calendar.reservations_by_room (
  id int,
  check_in date,
  check_out date,
  guests int,
  room_id int,
  user_id int,
  PRIMARY KEY (room_id,id)
);

CREATE TABLE calendar.prices_by_room_date (
  room_id int,
  date date,
  price int,
  PRIMARY KEY (room_id, date)
);

CREATE TABLE calendar.users (
  id int PRIMARY KEY,
  first_name varchar,
  last_name varchar,
  email varchar,
  password varchar
);