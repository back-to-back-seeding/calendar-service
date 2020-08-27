CREATE KEYSPACE calendar
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};


CREATE TABLE rooms (
  room_id int PRIMARY KEY,
  minimum_stay int,
  maximum_guest int,
  reviews int,
  rating decimal
);

CREATE TABLE prices (
  pricing_id int PRIMARY KEY,
  from_date timestamp,
  to_date timestamp,
  price int,
  room_id int
);

CREATE TABLE reservations_by_room (
  reservation_id int PRIMARY KEY,
  check_in timestamp,
  check_out timestamp,
  room_id int,
  PRIMARY KEY (reservation_id, room_id)
);

CREATE TABLE prices_by_date (
  room_id int,
  date timestamp,
  price int,
  PRIMARY KEY (room_id, date)
);

CREATE TABLE users (
  user_id int PRIMARY KEY,
  fisrt_name varchar,
  last_name varchar,
  email varchar,
  password varchar
);