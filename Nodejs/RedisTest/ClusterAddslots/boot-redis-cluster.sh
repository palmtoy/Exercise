#!/bin/bash

RCS='redis-cluster-server'
PORT=6380

RCS_PID=$(ps aux | grep 'redis-server 127.0.0.1:'${PORT} | grep -v "grep" | awk '{print $2}')
# echo 'RCS_PID =' $RCS_PID

if [[ -n "$RCS_PID" ]]
then
	kill -9 $RCS_PID
	sleep 1
fi

CMD_STR="./redis-server ./redis.conf"
echo $CMD_STR

screen -dmS $RCS bash -c "$CMD_STR"

sleep 2

screen -ls | grep $RCS


node cluster-addslots.js $PORT

