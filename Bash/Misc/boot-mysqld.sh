#!/bin/bash

MYSQLD8='mysqld-8.0.35'

KILL_MYSQLD_FLAG=$1
MYSQLD8_PID=0
FILE_PATH='logs/mysqld.pid'
if [ $# -gt 0 ] && [ $KILL_MYSQLD_FLAG -gt 0 ] && [ -f $FILE_PATH ]
then
		MYSQLD8_PID=$(cat $FILE_PATH)
		# MYSQLD8_PID=$(ps aux | grep 'mysqld --defaults-file' | grep -v "grep" | awk '{print $2}')
fi

# if [ $# -gt 0 ] && [ $KILL_MYSQLD_FLAG -gt 0 ] && [[ -n "$MYSQLD8_PID" ]]
if [ $# -gt 0 ] && [ $KILL_MYSQLD_FLAG -gt 0 ] && [ $MYSQLD8_PID -gt 0 ] # `$#` means the count of argument(s)
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

