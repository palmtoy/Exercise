#!/bin/bash

# declare an array called TMP_ARRAY and define 3 values
TMP_ARRAY=( one two three four five)

for i in "${TMP_ARRAY[@]}"
do
	echo $i
done

