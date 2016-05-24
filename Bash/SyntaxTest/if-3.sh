#!/bin/bash

TMP_NUM=$1

# default value: 0
TMP_NUM="${TMP_NUM:-0}"
echo "TMP_NUM =" $TMP_NUM

if [ $TMP_NUM -gt 0 ]
then
  echo "Bigger than 0." 

elif [ $TMP_NUM -lt 0 ]
then
  echo "Smaller than 0." 

else 
  echo "It's 0." 

fi  #ifend

