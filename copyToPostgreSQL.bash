#!/bin/bash

###################################################
# First Bash Shell script to execute psql command
###################################################

#Set the value of variable
database="calendar"

#Execute few psql commands:

psql -d $database -c "copy rooms from '/Users/blancagomez/Github/SEI/calendar/server/csv/rooms.csv' DELIMITER ',' CSV HEADER"
psql -d $database -c "copy users from '/Users/blancagomez/Github/SEI/calendar/server/csv/users.csv' DELIMITER ',' CSV HEADER"
psql -d $database -c "copy reservations from '/Users/blancagomez/Github/SEI/calendar/server/csv/reservations.csv' DELIMITER ',' CSV HEADER"
psql -d $database -c "copy prices from '/Users/blancagomez/Github/SEI/calendar/server/csv/prices.csv' DELIMITER ',' CSV HEADER"

