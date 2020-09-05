ALTER TABLE rooms ADD PRIMARY KEY (id);
ALTER TABLE reservations ADD PRIMARY KEY (id);
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE prices ADD PRIMARY KEY (id);

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