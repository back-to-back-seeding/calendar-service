-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-08-27 18:51:45.041

-- tables
-- Table: prices
CREATE TABLE prices (
    id int  NOT NULL,
    from_date date  NOT NULL,
    to_date date  NOT NULL,
    price int  NOT NULL,
    room_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: reservations
CREATE TABLE reservations (
    id int  NOT NULL,
    check_in date  NOT NULL,
    check_out date  NOT NULL,
    room_id int  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT reservations_pk PRIMARY KEY (id)
);

-- Table: rooms
CREATE TABLE rooms (
    id int  NOT NULL,
    minimum_stay int  NOT NULL,
    maximum_guest int  NOT NULL,
    reviews int  NULL,
    rating DECIMAL(3,2) NULL,
    CONSTRAINT rooms_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id int  NOT NULL,
    first_name varchar(80)  NOT NULL,
    last_name varchar(80)  NOT NULL,
    email varchar(20)  NOT NULL,
    password varchar(20)  NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Pricing_room (table: prices)
ALTER TABLE prices ADD CONSTRAINT Pricing_room
    FOREIGN KEY (room_id)
    REFERENCES rooms (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: reservation_room (table: reservations)
ALTER TABLE reservations ADD CONSTRAINT reservation_room
    FOREIGN KEY (room_id)
    REFERENCES rooms (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: reservation_user (table: reservations)
ALTER TABLE reservations ADD CONSTRAINT reservation_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.

