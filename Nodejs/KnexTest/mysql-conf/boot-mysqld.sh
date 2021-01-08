#!/bin/bash

MYSQLD8='mysqld-8.0.22'

MYSQLD8_PID=$(cat logs/mysqld.pid)
# MYSQLD8_PID=$(ps aux | grep 'mysqld --defaults-file' | grep -v "grep" | awk '{print $2}')

if [[ -n "$MYSQLD8_PID" ]]
then
	kill $MYSQLD8_PID
	sleep 1
fi

CMD_STR="./bin/mysqld --defaults-file=./my.cnf"
echo $CMD_STR

screen -dmS $MYSQLD8 bash -c "$CMD_STR"

sleep 2

screen -ls | grep $MYSQLD8

# Run the following cmd once to init MySQL data dir
# ./bin/mysqld --defaults-file=./my.cnf --initialize-insecure

