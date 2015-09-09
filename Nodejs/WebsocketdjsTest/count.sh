#!/bin/bash

# Define a timestamp function
timestamp() {
	date +"%T"
}

for ((COUNT = 1; COUNT <= 3600; COUNT++)); do
	NOW=$(timestamp)
  echo "I'm number:" $COUNT "~" $NOW
  sleep 1
done
