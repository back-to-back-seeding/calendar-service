CREATE KEYSPACE calendar
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};


CREATE TABLE rooms (
  id int PRIMARY KEY,
  minimum_stay int,
  maximum_guest int,
  reviews int,
  rating decimal
);

CREATE TABLE prices (
  id int PRIMARY KEY,
  from_date timestamp,
  to_date timestamp,
  price int,
  room_id int
);

CREATE TABLE reservations_by_room (
  id int,
  check_in timestamp,
  check_out timestamp,
  room_id int,
  user_id int,
  PRIMARY KEY ((room_id,id))
);

CREATE TABLE prices_by_room_date (
  room_id int,
  date timestamp,
  price int,
  PRIMARY KEY ((room_id, date))
);

CREATE TABLE users (
  user_id int PRIMARY KEY,
  fisrt_name varchar,
  last_name varchar,
  email varchar,
  password varchar
);