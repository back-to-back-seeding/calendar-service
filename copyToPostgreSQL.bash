#!/bin/bash

###################################################
# First Bash Shell script to execute psql command
###################################################

#Set the value of variable
database="calendar"

#Execute few psql commands:

psql -U blancagomez  -d $database -c "copy rooms from '/home/ec2-user/calendar-service/server/csv/rooms.csv' DELIMITER ',' CSV HEADER"
psql -U blancagomez -d $database -c "copy users from '/home/ec2-user/calendar-service/server/csv/users.csv' DELIMITER ',' CSV HEADER"
psql -U blancagomez -d $database -c "copy reservations from '/home/ec2-user/calendar-service/server/csv/reservations.csv' DELIMITER ',' CSV HEADER"
psql -U blancagomez $database -c "copy prices from '/home/ec2-user/calendar-service/server/csv/prices.csv' DELIMITER ',' CSV HEADER"

