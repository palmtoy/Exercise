#!/bin/bash

# Define a timestamp function
timestamp() {
	# date +"%T" # %H:%M:%S
	# date +"%s" # 1441770152
	date +"%r %Y-%m-%d" # 2015-09-09 11:45:51 AM
}

for ((COUNT = 1; COUNT <= 3600*2; COUNT++)); do
	NOW=$(timestamp)
	echo
  echo "******************************************"
  echo "I'm number:" $COUNT "~" $NOW
  echo "=========================================="
  sleep 1
done
