#!/bin/bash

SERVER_PNAMES=("GSLauncher" "LSLauncher" "WSLauncher")
ONETIME_FLAG=true
for TMP_NAME in ${SERVER_PNAMES[@]}
do
	SERVER_PID=$(ps aux | grep -v "grep" | grep $TMP_NAME | awk '{print $2}')
	TMP_LEN=${#SERVER_PID}
	if [ $TMP_LEN -gt 0 ]
	then
		if [ $ONETIME_FLAG = true ]
		then
			ONETIME_FLAG=false
			echo 'start to stop servers forcefully[kill -9 pid] ...'
		fi
		for TMP_PID in ${SERVER_PID[@]}
		do
			kill $TMP_PID
			echo $TMP_PID 'stop' $TMP_NAME forcefully, done.
			sleep 2
		done
	fi
done

